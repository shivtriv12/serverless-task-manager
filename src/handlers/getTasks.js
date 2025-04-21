const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

exports.getTasks = async (event) => {
  // Determine userId from Cognito authorizer or query parameter
  const userId = event.requestContext?.authorizer?.claims?.sub
                || event.queryStringParameters?.userId
                || 'anonymous';

  const result = await getClient().query({
    TableName: table,
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: { ':u': userId }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};
