const request = require('supertest');
const app = require('./app.js');

describe('Express Calculator Mean', () => {
  test('GET /mean should calculate the mean correctly', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4,5');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('mean');
    expect(response.body.response.value).toBeCloseTo(3);
  });
  test('GET /mean should handle single number input', async () => {
    const response = await request(app).get('/mean?nums=42');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('mean');
    expect(response.body.response.value).toBe(42);
  });
  test('GET /mean should return error for invalid input', async () => {
    const response = await request(app).get('/mean?nums=a,b,c');
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('is not a number');
  });
  test('GET /mean should return error for missing input', async () => {
    const response = await request(app).get('/mean');
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('Please provide a request like: /mean?nums=');
  });
});

describe('Express Calculator Median', () => {
  test('GET /median should calculate the median correctly for odd numbers', async () => {
    const response = await request(app).get('/median?nums=1,3,5,7,9');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('median');
    expect(response.body.response.value).toBe(5);
  });
  test('GET /median should calculate the median correctly for even numbers', async () => {
    const response = await request(app).get('/median?nums=1,2,3,4,5,6');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('median');
    expect(response.body.response.value).toBeCloseTo(3.5);
  });
  test('GET /median should handle single number input', async () => {
    const response = await request(app).get('/median?nums=42');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('median');
    expect(response.body.response.value).toBe(42);
  });
  test('GET /median should return error for invalid input', async () => {
    const response = await request(app).get('/median?nums=a,b,c');
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('is not a number');
  });
  test('GET /median should return error for missing input', async () => {
    const response = await request(app).get('/median');
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('Please provide a request like: /median?nums=');
  });
});

describe('Express Calculator Mode', () => {
  test('GET /mode should find the mode correctly', async () => {
    const response = await request(app).get('/mode?nums=1,2,2,3,3,3');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('mode');
    expect(response.body.response.value).toEqual(['3']);
  });
  test('GET /mode should handle multiple modes', async () => {
    const response = await request(app).get('/mode?nums=1,2,2,3,3,3,4,4,4');
    expect(response.statusCode).toBe(200);
    expect(response.body.response.operation).toBe('mode');
    expect(response.body.response.value.sort()).toEqual(['3', '4'].sort());
  });
  test('GET /mode should return error for invalid input', async () => {
    const response = await request(app).get('/mode?nums=a,b,c');
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('is not a number');
  });
  test('GET /mode should return error for missing input', async () => {
    const response = await request(app).get('/mode');
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('Please provide a request like: /mode?nums=');
  });
});
