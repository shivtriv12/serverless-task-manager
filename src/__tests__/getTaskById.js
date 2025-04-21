// src/__tests__/getTaskById.js

// 1) Mock our local Dynamo helper
jest.mock('../lib/dynamo', () => ({
  getClient: () => ({
    get: () => ({
      promise: () => Promise.resolve({
        Item: {
          userId: 'u2',
          taskId: 't2',
          title: 'Test2',
          description: 'Desc2',
          dueDate: '2025-04-23',
          status: 'done'
        }
      })
    })
  })
}));

// 2) Import your handler correctly
const { getTaskById } = require('../handlers/getTaskById');

describe('getTaskById handler', () => {
  it('returns 200 and the task when found', async () => {
    const event = {
      pathParameters: { id: 't2' },
      requestContext: { authorizer: { claims: { sub: 'u2' } } }
    };

    const res = await getTaskById(event);
    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body);
    expect(body).toEqual({
      userId: 'u2',
      taskId: 't2',
      title: 'Test2',
      description: 'Desc2',
      dueDate: '2025-04-23',
      status: 'done'
    });
  });
});
