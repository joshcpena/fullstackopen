const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({ username: body.username });
  const passwordCheck = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCheck)) {
    return response.status(401).json({ error: 'invalid username or pasword' });
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  // expire token in 30 min
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 30 });

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
