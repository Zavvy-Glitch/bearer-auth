'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      users: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    users: req.users,
    token: req.users.token
  };
  res.status(201).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await users.findAll({});
  const list = users.map(user => user.username);
  res.status(201).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(201).send("Welcome to the secret area!")
});


module.exports = authRouter;
