const aws = require('aws-sdk');
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function sendEmail({ destinationEmail, subject = '', text = '' }) {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ['SENDER_EMAIL', 'SENDER_PASS'].map(
        (secretName) => process.env[secretName]
      ),
      WithDecryption: true,
    })
    .promise();

  const senderEmail = Parameters[0].Value;
  const senderPass = Parameters[1].Value;
  console.log({ senderEmail, senderPass, destinationEmail, subject, text });
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPass,
      },
    })
  );

  const mailOptions = {
    from: senderEmail,
    to: destinationEmail,
    subject,
    text,
    html: `<html>
    <h2>Some water please</h2>
    <p>${text}</p>
    <p>Check 
    <a href="https://main.d229upurn3znoj.amplifyapp.com/" target="_blank" rel="noopener noreferrer">Plantsky</a>
    for more details
    </p>
  </html>
  `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return {
      isError: false,
      statusCode: 200,
      body: JSON.stringify({
        message: `Email processed succesfully!`,
      }),
      result,
    };
  } catch (error) {
    return {
      isError: true,
      statusCode: 500,
      message: JSON.stringify({
        error: error.message,
      }),
    };
  }
}

/* Amplify Params - DO NOT EDIT
	API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT
	API_PLANTSKY_GRAPHQLAPIIDOUTPUT
	API_PLANTSKY_GRAPHQLAPIKEYOUTPUT
	API_PLANTSKY_MAILINGLISTTABLE_ARN
	API_PLANTSKY_MAILINGLISTTABLE_NAME
	API_PLANTSKY_PLANTTABLE_ARN
	API_PLANTSKY_PLANTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const QUERY_MAILLIST = gql`
  query {
    listMailingLists {
      startedAt
      items {
        id
        _version
        email
      }
    }
  }
`;

const LIST_DRY_PLANTS_PER_USER = gql`
  query dryPlants($belongsTo: String!, $nextWater: String!) {
    listPlants(
      filter: { belongsTo: { eq: $belongsTo }, nextWater: { le: $nextWater } }
    ) {
      items {
        id
        _version
        _deleted
        name
        location
        imageURL
        nextWater
        firstNotificationSentAt
        belongsTo
      }
    }
  }
`;

// Update Plants table firstNotificationSentAt
// const UPDATE_NOTIFICATION_SENT_DATETIME = gql`
//   mutation updateFirstNotificationSent(
//     $id: ID!
//     $firstNotificationSentAt: String!
//     $_version: Number
//   ) {
//     updatePlant(
//       input: {
//         id: $id
//         firstNotificationSentAt: $firstNotificationSentAt
//         _version: $_version
//       }
//     ) {
//       id
//       _version
//       name
//       firstNotificationSentAt
//     }
//   }
// `;

// Update Mailing List table lastMessageSent
const UPDATE_COMMUNICATION_SENT_DATETIME = gql`
  mutation updateCommunicationSentDatetime(
    $id: ID!
    $lastMessageSent: AWSDateTime
    $_version: Int
  ) {
    updateMailingList(
      input: { id: $id, lastMessageSent: $lastMessageSent, _version: $_version }
    ) {
      lastMessageSent
      id
      email
      _version
    }
  }
`;

exports.handler = async (event) => {
  try {
    const maillistResponse = await axios({
      url: process.env.API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_PLANTSKY_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(QUERY_MAILLIST),
      },
    });

    const maillist = maillistResponse.data.data.listMailingLists.items;
    console.log({ maillist });

    // const now = '2021-12-14T23:34:33.693Z'; // for testing
    const now = new Date().toISOString();

    const dryPlantsPromises = maillist.map(({ email }) => {
      return axios({
        url: process.env.API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT,
        method: 'post',
        headers: {
          'x-api-key': process.env.API_PLANTSKY_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(LIST_DRY_PLANTS_PER_USER),
          variables: { belongsTo: email, nextWater: now },
        },
      });
    });
    const dryPlantsData = await Promise.all(dryPlantsPromises);
    const dryPlants = dryPlantsData.map(
      (res) => res.data.data.listPlants.items
    );

    for (let [i, allSingleUserPlants] of Object.entries(dryPlants)) {
      if (!allSingleUserPlants.length) {
        continue;
      }
      const singleUserPlants = allSingleUserPlants.filter(
        (plant) => !plant._deleted
      );
      if (!singleUserPlants.length) {
        continue;
      }
      console.log({ singleUserPlants });
      const names =
        singleUserPlants.length < 3
          ? `${singleUserPlants.map((plant) => plant.name).join(', ')}`
          : `${singleUserPlants
              .slice(0, 2)
              .map((plant) => plant.name)
              .join(', ')} and ${singleUserPlants.length - 2} more`;

      const emailResult = await sendEmail({
        destinationEmail: singleUserPlants[0].belongsTo,
        subject: `Plantsky reminder: ${singleUserPlants.length} of your plants need watering`,
        text: `${names} of your plants are running dry and need your attention.`,
      });
      console.log({ emailResult });

      if (emailResult.isError) {
        continue;
      }

      const currentRecepient = maillist[i];

      console.log({ currentRecepient });

      const updateMailListResult = await axios({
        url: process.env.API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT,
        method: 'post',
        headers: {
          'x-api-key': process.env.API_PLANTSKY_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(UPDATE_COMMUNICATION_SENT_DATETIME),
          variables: {
            id: currentRecepient.id,
            lastMessageSent: new Date().toISOString(),
            _version: currentRecepient._version,
          },
        },
      });
      console.log({
        updateMailListResult: updateMailListResult.data.data,
        err: updateMailListResult.data.errors,
      });
    }

    // for every email in this list - fetch plants where now time is > nextWater time
  } catch (err) {
    console.log('error sending dry plant notification: ', err);
  }
};
