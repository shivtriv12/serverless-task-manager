// src/handlers/getTaskById.js
const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

async function getTaskById(event) {
  const userId = event.requestContext.authorizer?.claims?.sub || 'anonymous';
  const taskId = event.pathParameters.id;

  const result = await getClient().get({
    TableName: table,
    Key: { userId, taskId }
  }).promise();

  return {
    statusCode: result.Item ? 200 : 404,
    body: JSON.stringify(result.Item),
  };
}

module.exports = { getTaskById };            // <-- named export
// or: exports.getTaskById = getTaskById;
