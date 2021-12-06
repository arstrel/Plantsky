const aws = require('aws-sdk');

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function sendEmail({ destinationEmail, text }) {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ['SENDER_EMAIL', 'SENDER_PASS'].map(
        (secretName) => process.env[secretName]
      ),
      WithDecryption: true,
    })
    .promise();
  const { Parameters: params } = await new aws.SSM()
    .getParameters({
      Names: ['SENDER_EMAIL', 'SENDER_PASS'],
      WithDecryption: true,
    })
    .promise();
  // Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]

  console.log({ Parameters, params });

  const senderEmail = 'plantsky.app@gmail.com';
  const senderPass = '';

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
    subject: 'Some of your plants need watering',
    text: text,
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

const UPDATE_NOTIFICATION_SENT_DATETIME = gql`
  mutation updateFirstNotificationSent(
    $id: ID!
    $firstNotificationSentAt: String!
    $_version: Number
  ) {
    updatePlant(
      input: {
        id: $id
        firstNotificationSentAt: $firstNotificationSentAt
        _version: $_version
      }
    ) {
      id
      _version
      name
      firstNotificationSentAt
    }
  }
`;

const UPDATE_COMMUNICATION_SENT_DATETIME = gql`
  mutation updateCommunicationSentDatetime(
    $id: ID!
    $lastMessageSent: String
    $_version: Number
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
    const maillist = await axios({
      url: process.env.API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_PLANTSKY_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(QUERY_MAILLIST),
      },
    });
    console.log({ maillist: maillist.data.data.listMailingLists.items });

    const now = '2021-12-14T23:34:33.693Z';
    // const now = new Date().toISOString();
    const dryPlantsPromises = maillist.data.data.listMailingLists.items.map(
      ({ email }) => {
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
      }
    );
    const dryPlantsData = await Promise.all(dryPlantsPromises);
    const dryPlants = dryPlantsData.flatMap(
      (res) => res.data.data.listPlants.items
    );
    console.log({ dryPlants });

    const emailResult = await sendEmail({
      destinationEmail: 'arstrel@gmail.com',
      text: 'Your plant is getting dry test email',
    });

    console.log({ emailResult });

    // for every email in this list - fetch plants where now time is > nextWater time
  } catch (err) {
    console.log('error posting to appsync: ', err);
  }
};
