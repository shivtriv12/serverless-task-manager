// src/__tests__/deleteTask.test.js

// 1) Mock our local Dynamo helper
jest.mock('../lib/dynamo', () => ({
    getClient: () => ({
      delete: () => ({
        promise: () => Promise.resolve({})
      })
    })
  }));
  
  const { deleteTask } = require('../handlers/deleteTask');
  
  test('deleteTask returns 204 with empty body', async () => {
    const event = {
      pathParameters: { id: 't4' },
      requestContext: { authorizer: { claims: { sub: 'u4' } } }
    };
  
    const res = await deleteTask(event);
    expect(res.statusCode).toBe(204);
    expect(res.body).toBe('');
  });
  