// src/handlers/createTask.js
const { v4: uuid } = require('uuid');
const { getClient } = require('../lib/dynamo');
const table = process.env.TASKS_TABLE;

exports.createTask = async (event) => {
  // Use Cognito identity for userId
  const userId = event.requestContext.authorizer.claims.sub;
  const { title, description, dueDate } = JSON.parse(event.body);

  const newTask = {
    userId,
    taskId: uuid(),
    title,
    description,
    dueDate,
    status: 'pending'
  };

  await getClient().put({
    TableName: table,
    Item: newTask
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newTask)
  };
};