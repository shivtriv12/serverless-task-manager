// in src/handlers/getTasks.js
exports.getTasks = async (event) => {
  // fall back from authorizer to query string
  const userId = event.requestContext.authorizer?.claims?.sub
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
