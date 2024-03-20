// test.js (your test file)

const request = require('supertest');
const express = require('express');
const router = require('../routers/quotehistory.js'); // Adjust the path to your actual quotehistory.js file

const app = express();

// Define your routes and middleware

module.exports = app;

describe('Login Route', () => {
  it('should log in successfully', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'johnny',
        password: '12345'
      });

    expect(response.status).toBe(200);
   // expect(response.text).toContain('Account does not exist.');
   // expect(response.text).toContain('login');
  });

  
  
  
  
  it('should return an error for a non-existent username', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'notexist',
        password: 'testpass'
      });

    expect(response.status).toBe(404);
   // expect(response.text).toContain('Account does not exist.');
   // expect(response.text).toContain('login');
  });

  it('should return an error for an incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpass'
      });

    expect(response.status).toBe(404);
    //expect(response.text).toContain('Incorrect password, try again.');
    //expect(response.text).toContain('login');
  });



});