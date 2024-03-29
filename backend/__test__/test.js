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
    expect(response.status).toBe(200);                  Use 200 when it should be successful submission, 500 when it should fail
  });
*/

const request = require('supertest');
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
    expect(response.status).toBe(200);
  });
  
  it('should return an error for a non-existent username', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'notexist',
        password: 'testpass'
      });
    expect(response.status).toBe(500);
  });

  it('should return an error for an incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpass'
      });
    expect(response.status).toBe(500);
  });
});



describe('Quotehistory Route', () => {
  it('fetch quotehistory correctly', async () => {
    const response = await request(app)
      .get('/quotehistory/3')
    expect(response.status).toBe(200);
  });

  it('checks if inputs are invalid in quotehistory router', async () => {
    const response = await request(app).get('/quotehistory/0');
    expect(typeof response.body).toBe(typeof []);
    expect(response.body).toHaveLength(0);
    expect(response.status).toBe(200);
  });

  // it('checks if inputs are valid.', async () => {
  //   const response = await request(app).get('/quotehistory/johnny');
  //  // expect(typeof response.body).toBe(typeof []);
  //   expect(typeof response.body[0]).toBe(typeof {});
  //   expect(response.body[0]).toContain('number');
  //   expect(response.body[0]).toHaveProperty('gallonsRequested');
  //   expect(response.body[0]).toHaveProperty('deliveryDate');
  //   expect(response.body[0]).toHaveProperty('suggestedPrice');
  //   expect(response.body[0]).toHaveProperty('totalPrice');
  //   expect(response.body[0]).toHaveProperty('address');
  //   expect(response.status).toBe(200);
  // });
});

describe('Profile Route', () => {
  it('should get a users profile information', async () => {
    const response = await request(app)
    .get('/profile/3');
    expect(response.status).toBe(200);
  });

  it('should submit the profile form successfully', async () => {
    const response = await request(app)
      .post('/profile')
      .send({
        userId: 3,
        name: 'Archibald Humphrey',
        address1: '4300 Martin Luther King Blvd',
        address2: '', // address 2 is optional, dont know if we should test it both ways (blank and not blank)
        city: 'Houston',
        state: 'TX',
        zipcode: '77204'
      });
      expect(response.status).toBe(200);
  });

  it('should return an error for a blank full name', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: '',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid full name', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank address1', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: '',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid address1', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });    

  it('should return an error for an invalid address2', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank city', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: '',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank state', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: '',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid zipcode', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '7720'
    });
    expect(response.status).toBe(200);
  });
  it('should return an error for an invalid zipcode w/ letters', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 3,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '7720a'
    });
    expect(response.status).toBe(500);
  });
});

describe('Fuel Rate Route', () => {
  it('should return a successful form', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote/2')
    .send({
      userId: 2,
      gallonsRequested: 5000,
      deliveryAddress: '4300 Martin Luther King Blvd', // comes from client profile, dont know how we would implement this w/ city, state, zip
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalAmount: 50000000
    });
    //expect(response.totalAmount).toBe(response.gallonsRequested*response.suggestedPrice);
    expect(response.status).toBe(200);
  });

  it('should return an error for an invalid username', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote/0')
    .send({
      gallonsRequested: 10,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 100,
      totalAmount: 15
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid gallons req', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote/2')
    .send({
      userId: 2,
      gallonsRequested: 'a',
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalAmount: 15000
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid delivery date', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote/2')
    .send({
      userId: 2,
      gallonsRequested: 5000,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '1776-02-16',
      suggestedPrice: 10000,
      totalAmount: 15000
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for when a delivery address isnt retrieved', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote/2')
    .send({
      userId: 2,
      gallonsRequested: 5000,
      deliveryAddress: '', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalAmount: 15000
    });
    expect(response.status).toBe(500);
  });

  /*it('should return an error for when the suggested price isnt retrieved', async () => {
    const response = await request(app)
    .post('/fuelrate/johnny')
    .send({
      gallonsRequested: 5000,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 0,
      totalAmount: 1
    });
    expect(response.status).toBe(500);
  });*/

  it('should return an error for if totalAmount isnt equal to gallons*price', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote/2')
    .send({
      userId: 2,
      gallonsRequested: 10,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 100,
      totalAmount: 15
    });
    expect(response.status).toBe(500);
    expect(response.totalAmount).not.toBe(response.gallonsRequested*response.suggestedPrice);
  });

  it('should return an error for if total amount isnt loaded', async () => {
    const response = await request(app)
    .post('/fuelrate/savequote/2')
    .send({
      userId: 2,
      gallonsRequested: 10,
      deliveryAddress: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 100,
      totalAmount: 0
    });
    expect(response.status).toBe(500);
  });


}); 

describe('Signup Route', () => {
  it('should return a successful sign up creation', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'papajh',
      password: 'lepookie123'
    });
    expect(response.status).toBe(200);
  });

  it('should return an error for username that already exists', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'johnny',
      password: '12345'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for invalid username', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fuel tracker',
      password: 'lepookie123'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for long username', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fueltrackerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
      password: 'lepookie123'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid password', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fueltracker',
      password: 'lepookie123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
    });
    expect(response.status).toBe(500);
  });
})