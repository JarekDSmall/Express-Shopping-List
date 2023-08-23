const request = require('supertest');
const app = require('./app'); 

describe('API Routes', () => {
  it('GET /items should return a list of shopping items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /items should add a new item to the shopping list', async () => {
    const newItem = { name: 'new item', price: 9.99 };
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(200);
    expect(response.body.added).toEqual(newItem);
  });

});
