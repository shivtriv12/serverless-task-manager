// src/__tests__/getTasks.test.js

// 1) Mock our local Dynamo helper
jest.mock('../lib/dynamo', () => ({
    getClient: () => ({
      query: () => ({
        promise: () => Promise.resolve({
          Items: [
            {
              userId: 'u1',
              taskId: 't1',
              title: 'Test1',
              description: 'Desc1',
              dueDate: '2025-04-22',
              status: 'pending'
            }
          ]
        })
      })
    })
  }));
  
  const { getTasks } = require('../handlers/getTasks');
  
  test('getTasks returns 200 and list of tasks', async () => {
    const event = {
      requestContext: { authorizer: { claims: { sub: 'u1' } } }
    };
  
    const res = await getTasks(event);
    expect(res.statusCode).toBe(200);
  
    const body = JSON.parse(res.body);
    expect(body).toEqual([
      {
        userId: 'u1',
        taskId: 't1',
        title: 'Test1',
        description: 'Desc1',
        dueDate: '2025-04-22',
        status: 'pending'
      }
    ]);
  });
  