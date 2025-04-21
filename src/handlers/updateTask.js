const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

exports.updateTask = async (event) => {
  const userId = event.requestContext.authorizer?.claims?.sub || 'anonymous';
  const taskId = event.pathParameters.id;
  const { title, description, dueDate, status } = JSON.parse(event.body);

  const result = await getClient().update({
    TableName: table,
    Key: { userId, taskId },
    UpdateExpression: 'set title=:t, description=:d, dueDate=:dd, #s=:s',
    ExpressionAttributeNames: { '#s': 'status' },
    ExpressionAttributeValues: {
      ':t': title,
      ':d': description,
      ':dd': dueDate,
      ':s': status
    },
    ReturnValues: 'ALL_NEW'
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Attributes),
  };
};
