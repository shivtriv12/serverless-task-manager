// src/__tests__/createTask.test.js

// 1) Mock uuid
jest.mock('uuid', () => ({ v4: () => 'fixed-uuid' }));

// 2) Mock our local Dynamo helper (path is ../lib/dynamo, not ../src/lib/dynamo)
jest.mock('../lib/dynamo', () => ({
  getClient: () => ({
    put: () => ({ promise: () => Promise.resolve({}) })
  })
}));

// 3) Import the handler under test (path is ../handlers/createTask)
const { createTask } = require('../handlers/createTask');

describe('createTask handler', () => {
  it('returns 201 and the new task', async () => {
    const event = {
      body: JSON.stringify({
        userId: 'user-1',
        title: 'Test',
        description: 'Desc',
        dueDate: '2025-04-21'
      })
    };

    const res = await createTask(event);
    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res.body)).toEqual({
      userId: 'user-1',
      taskId: 'fixed-uuid',
      title: 'Test',
      description: 'Desc',
      dueDate: '2025-04-21',
      status: 'pending'
    });
  });
});
