const request = require('supertest');
const { app, server } = require('../index');

describe('HTTP Endpoints', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  it('should get all employees', async () => {
    const res = await request(app).get('/employees');

    // The result should return a 200 status code
    expect(res.statusCode).toEqual(200);

    // The response should be an array
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a single employee', async () => {
    const res = await request(app).get('/employees/1');

    // The result should return a 200 status code
    expect(res.statusCode).toEqual(200);

    // The response should be an object
    expect(res.body).toHaveProperty('id');
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
