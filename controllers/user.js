const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pick = require('lodash.pick');
const User = require('../models/user');

const UserController = {
  checkIfExists: (params) => User.findOne({ ...params }),
  create: async (ctx) => {
    const { username, password } = ctx.request.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      if (await UserController.checkIfExists({ username })) {
        return ctx.send(400, 'User with such username already exists');
      }

      const user = await User.create({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: hash,
      });

      const token = jwt.sign(pick(user, ['_id', 'username']), 'TOKEN_SECRET', {
        expiresIn: 50000,
      });

      return ctx.send(200, {
        user: pick(user, ['_id', 'username']),
        token,
      });
    } catch (error) {
      return ctx.send(500, error.message);
    }
  },
  getAll: async (ctx) => {
    const users = await User.find();

    return (users && users.length)
      ? ctx.send(200, users)
      : ctx.send(200);
  },
  update: async (ctx) => {
    const { username } = ctx.request.body;
    const { id } = ctx.params;

    const user = await UserController.checkIfExists({ _id: id });

    if (!user) return ctx.send(400, 'No user with such id');

    try {
      await User.findOneAndUpdate({ _id: id }, { username });
      return ctx.send(200);
    } catch (error) {
      return ctx.send(500, error.message);
    }
  },
  changePassword: async (ctx) => {
    const { password } = ctx.request.body;
    const { id } = ctx.params;

    const user = await UserController.checkIfExists({ _id: id });

    if (!user) return ctx.send(400, 'No user with such id');

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate({ _id: id }, { 
        password: hash
      });

      return ctx.send(200);
    } catch (error) {
      return ctx.send(500, error.message);
    }
  },
  authMiddleware: async (ctx, next) => {
    const token = ctx.request.headers['auth'];
    if (!token) return ctx.send(401, 'No auth header provided');

    const payload = jwt.decode(token);
    if (!payload || !payload._id) return ctx.send(400, 'No user with such id');

    ctx.userId = payload._id;
    return next();
  },
};

module.exports = UserController;
