const request = require('supertest');
const { app, server } = require('../index');

describe('HTTP POST Endpoints', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  it('should create a new employee', async () => {
    const res = await request(app).post('/employees').send({
      name: 'Dries Augustyns',
      position: 'Technical Architect',
    });

    // The result should return a 200 status code
    expect(res.statusCode).toEqual(200);

    // If the employee was created successfully, the response should contain the new employee's ID
    expect(res.body).toHaveProperty('id');
  });
});
