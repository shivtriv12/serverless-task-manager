const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

exports.deleteTask = async (event) => {
  const userId = event.requestContext.authorizer?.claims?.sub || 'anonymous';
  const taskId = event.pathParameters.id;

  await getClient().delete({
    TableName: table,
    Key: { userId, taskId }
  }).promise();

  return {
    statusCode: 204,
    body: '',
  };
};
