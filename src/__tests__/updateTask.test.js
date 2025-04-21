// src/__tests__/updateTask.test.js

// 1) Mock our local Dynamo helper
jest.mock('../lib/dynamo', () => ({
    getClient: () => ({
      update: () => ({
        promise: () => Promise.resolve({
          Attributes: {
            userId: 'u3',
            taskId: 't3',
            title: 'Updated',
            description: 'Updated Desc',
            dueDate: '2025-04-24',
            status: 'in-progress'
          }
        })
      })
    })
  }));
  
  const { updateTask } = require('../handlers/updateTask');
  
  test('updateTask returns 200 and the updated task', async () => {
    const event = {
      pathParameters: { id: 't3' },
      requestContext: { authorizer: { claims: { sub: 'u3' } } },
      body: JSON.stringify({
        title: 'Updated',
        description: 'Updated Desc',
        dueDate: '2025-04-24',
        status: 'in-progress'
      })
    };
  
    const res = await updateTask(event);
    expect(res.statusCode).toBe(200);
  
    const body = JSON.parse(res.body);
    expect(body).toEqual({
      userId: 'u3',
      taskId: 't3',
      title: 'Updated',
      description: 'Updated Desc',
      dueDate: '2025-04-24',
      status: 'in-progress'
    });
  });
  