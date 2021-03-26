const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const User = require('../models/user');
const helper = require('./tests_helper');

const api = supertest(app);

describe('when there is intially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('s3crets', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'newuser_1',
      name: 'Frist Last',
      password: 'somepassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usersAtEnd.map((u) => u.username)).toContain(newUser.username);
  });

  test('createion fails if usersname !unique', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'root',
      name: 'Frist Last',
      password: 'somepassword',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation of user fails if password is invalid', async () => {
    // test missing password
    let newUser = {
      username: 'newuser_1',
      name: 'Frist Last',
    };

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    expect(result.body.error).toContain('`password` is required');

    // test short password
    newUser = {
      username: 'newuser_1',
      name: 'Frist Last',
      password: '01',
    };
    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    expect(result.body.error).toContain('`password` is shorter');
  });
  test('creation of user fails if username is invalid', async () => {
    // test missing username
    let newUser = {
      name: 'Frist Last',
      password: 'secret',
    };

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    expect(result.body.error).toContain('`username` is required.');

    // test short username
    newUser = {
      username: 'us',
      name: 'Frist Last',
      password: 'secret',
    };
    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)');
  });
});

afterAll(() => mongoose.connection.close());
