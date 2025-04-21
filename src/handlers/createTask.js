const { v4: uuid } = require('uuid');
const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

exports.createTask = async (event) => {
  const { userId, title, description, dueDate } = JSON.parse(event.body);
  const taskId = uuid();

  const item = { userId, taskId, title, description, dueDate, status: 'pending' };
  await getClient().put({
    TableName: table,
    Item: item
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
};