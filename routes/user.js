const router = require('koa-joi-router');
const UserController = require('../controllers/user');

const userRouter = router();

const { Joi } = router;

userRouter.prefix('/api/users');

userRouter.route({
  method: 'post',
  path: '/',
  validate: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
    type: 'json',
  },
  handler: UserController.create,
});

userRouter.route({
  method: 'get',
  path: '/',
  handler: UserController.getAll,
});

userRouter.route({
  method: 'put',
  path: '/:id/change-password',
  validate: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      password: Joi.string().required(),
    },
    type: 'json',
  },
  handler: UserController.changePassword,
});

userRouter.route({
  method: 'put',
  path: '/:id',
  validate: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      username: Joi.string().required(),
    },
    type: 'json',
  },
  handler: UserController.update,
});

module.exports = userRouter;