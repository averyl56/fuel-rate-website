/* 
 test.js (your test file)
 To install jest: npm install --save-dev jest 
 Also install supertest: npm install supertest
 To test: npm test -- --coverage

 describe('Login Route', () => {                        This describes what you're testing, it can be called anything
  it('should log in successfully', async () => {        This describes what it should do
    const response = await request(app)     
      .post('/login')                                   Add in the route you're using
      .send({                                           Hardcode the vals
        username: 'johnny',
        password: '12345'
      });
    expect(response.status).toBe(200);                  Use 200 when it should be successful submission, 404 when it should fail
  });
*/

const request = require('supertest');
const express = require('express');

const router1 = require('../routers/fuelrate.js');
const router2 = require('../routers/login.js');
const router3 = require('../routers/profile.js');
const router4 = require('../routers/quotehistory.js');
const router5 = require('../routers/signup.js');

const app = require('../server.js');
// Define your routes and middleware

describe('Login Route', () => {
  it('should log in successfully', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'johnny',
        password: '12345'
      });
    expect(response.status).toBe(404);
  });
  
  it('should return an error for a non-existent username', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'notexist',
        password: 'testpass'
      });
    expect(response.status).toBe(404);
  });

  it('should return an error for an incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpass'
      });
    expect(response.status).toBe(404);
  });

  it('should return an error for an too many attempts at password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpassagain'
      });
    expect(response.status).toBe(404);
  });
});

describe('Quotehistory Route', () => {
  it('fetch quotehistory incorrectly for specified username and password', async () => {
    const response = await request(app)
      .post('/quotehistory')
      .send({
        username: 'johnny',
        password: '12345',
        date: '2-19-2024',
        gallons: '29',
        money: '129',
      });
    expect(response.status).toBe(404);
  });

  it('should return an error for an incorrect quote', async () => {
    const response = await request(app)
      .post('/quote')
      .send({
        username: 'johnny',
        password: '12345',
        date: '2-19-2024',
        gallons: '29',
        money: '23',
      });
    expect(response.status).toBe(404);
  });

  it('should return an error incorrect gallons history', async () => {
    const response = await request(app)
      .post('/history')
      .send({
        username: 'johnny',
        password: '12345',
        date: '2-19-2024',
        gallons: '2',
        money: '139',
      });
    expect(response.status).toBe(404);
  });

  it('should return an error for an too many attempts at password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpassagain'
      });
    expect(response.status).toBe(404);
  });
});

describe('Quote History Route', () => {
  it('checks if inputs are invalid in quotehistory router', async () => {
    const response = await request(app).get('/HISTORY');
    expect(response.status).toBe(404);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('username').that.is.a('string');
    expect(response.body[0]).to.have.property('requested').that.is.a('number');
    expect(response.body[0]).to.have.property('date').that.is.a('string');
    expect(response.body[0]).to.have.property('money').that.is.a('number');
  });
});

describe('Quote History', () => {
  it('checks if inputs are valid.', async () => {
    const response = await request(app).get('/HISTORY');
    expect(response.status).toBe(404);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('username').that.is.a('string');
    expect(response.body[0]).to.have.property('requested').that.is.a('number');
    expect(response.body[0]).to.have.property('date').that.is.a('string');
    expect(response.body[0]).to.have.property('money').that.is.a('number');
  });
});

describe('Profile Route', () => {
  it('should submit the profile form successfully', async () => {
    const response = await request(app)
      .post('/profile')
      .send({
        name: 'Archibald Humphrey',
        address1: '4300 Martin Luther King Blvd',
        address2: '', // address 2 is optional, dont know if we should test it both ways (blank and not blank)
        city: 'Houston',
        state: 'TX',
        zipcode: '77204'
      });
      expect(response.status).toBe(404);
  });

  it('should return an error for a blank full name', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: '',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid full name', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for a blank address1', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid address1', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });    

  it('should return an error for an invalid address2', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for a blank city', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: '',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid city', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for a blank state', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: '',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid state', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'AU',
      zipcode: '77204'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid zipcode', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '7720'
    });
    expect(response.status).toBe(404);
  });
});

describe('Fuel Rate Route', () => {
  it('should return a successful form', async () => {
    const response = await request(app)
    .post('./fuelrate')
    .send({
      gallonsRequested: 5000,
      deliveryAddress: '4300 Martin Luther King Blvd', // comes from client profile, dont know how we would implement this w/ city, state, zip
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalAmount: 50000000
    });
    expect(response.status).toBe(200);
  });

  it('should return an error for an invalid gallons req', async () => {
    const response = await request(app)
    .post('/fuelrate')
    .send({
      gallonsRequested: 'a',
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalAmount: 15000
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid delivery date', async () => {
    const response = await request(app)
    .post('/fuelrate')
    .send({
      gallonsRequested: 5000,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '1776-02-16',
      suggestedPrice: 10000,
      totalAmount: 15000
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for when a delivery address isnt retrieved', async () => {
    const response = await request(app)
    .post('/fuelrate')
    .send({
      gallonsRequested: 5000,
      deliveryAddress: '', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalAmount: 15000
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for when the suggested price isnt retrieved', async () => {
    const response = await request(app)
    .post('/fuelrate')
    .send({
      gallonsRequested: 5000,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 0,
      totalAmount: 1
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for if totalAmount isnt equal to gallons*price', async () => {
    const response = await request(app)
    .post('/fuelrate')
    .send({
      gallonsRequested: 10,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 100,
      totalAmount: 15
    });
    expect(response.status).toBe(404);
  });
}); 

describe('Signup Route', () => {
  it('should return a successful sign up creation', async () => {
    const response = await request(app)
    .post('signup')
    .send({
      username: 'papajhn',
      password: 'lepookie123'
    });
    expect(response.status).toBe(200);
  });

  it('should return an error for invalid username', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fuel tracker',
      password: 'lepookie123'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for long username', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fueltrackerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
      password: 'lepookie123'
    });
    expect(response.status).toBe(404);
  });

  it('should return an error for an invalid password', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fueltracker',
      password: 'lepookie123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
    });
    expect(response.status).toBe(404);
  });
})