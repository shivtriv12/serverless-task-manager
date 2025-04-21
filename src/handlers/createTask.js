const { v4: uuid } = require('uuid');
const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

exports.createTask = async (event) => {
  // Parse incoming JSON
  const data = JSON.parse(event.body);

  // Determine userId: prefer Cognito auth but allow manual userId for tests
  const userId = event.requestContext?.authorizer?.claims?.sub || data.userId;
  const { title, description, dueDate } = data;

  // Build new task object
  const newTask = {
    userId,
    taskId: uuid(),
    title,
    description,
    dueDate,
    status: 'pending'
  };

  // Persist to DynamoDB
  await getClient().put({
    TableName: table,
    Item: newTask
  }).promise();

  // Return response
  return {
    statusCode: 201,
    body: JSON.stringify(newTask)
  };
};

