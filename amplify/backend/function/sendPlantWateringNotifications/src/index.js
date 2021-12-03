const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

/* Amplify Params - DO NOT EDIT
	API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT
	API_PLANTSKY_GRAPHQLAPIIDOUTPUT
	API_PLANTSKY_GRAPHQLAPIKEYOUTPUT
	API_PLANTSKY_MAILINGLISTTABLE_ARN
	API_PLANTSKY_MAILINGLISTTABLE_NAME
	API_PLANTSKY_PLANTTABLE_ARN
	API_PLANTSKY_PLANTTABLE_NAME
	AUTH_PLANTSKY_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const listMailingLists = gql`
  query MyQuery {
    listMailingLists {
      startedAt
      items {
        email
      }
    }
  }
`;

exports.handler = async (event) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_PLANTSKY_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_PLANTSKY_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(listMailingLists),
      },
    });
    console.log(graphqlData.data.data.listMailingLists.items);
    const body = {
      graphqlData: graphqlData.data.data.listMailingLists.items,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (err) {
    console.log('error posting to appsync: ', err);
  }
};
