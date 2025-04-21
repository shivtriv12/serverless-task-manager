// __tests__/createTask.test.js

// 1) Mock uuid before importing your handler
jest.mock('uuid', () => ({ v4: () => 'fixed-uuid' }));

// 2) Mock your Dynamo helper so put().promise() resolves immediately
jest.mock('../src/lib/dynamo', () => ({
  getClient: () => ({
    put: () => ({
      promise: () => Promise.resolve({})
    })
  })
}));

// 3) Now import the handler under test
const { createTask } = require('../src/handlers/createTask');

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
