const router = require('koa-joi-router');
const NoteController = require('../controllers/note');
const UserController = require('../controllers/user');

const noteRouter = router();

const { Joi } = router;

noteRouter.prefix('/api/notes');

noteRouter.route({
  method: 'get',
  path: '/users/:userId',
  validate: {
    params: {
      userId: Joi.string().required(),
    },
  },
  handler: NoteController.getAllUsers,
});

noteRouter.route({
  method: 'get',
  path: '/',
  validate: {
    query: {
      text: Joi.string().optional(),
    },
  },
  handler: NoteController.getAll,
});

noteRouter.use('/', UserController.authMiddleware);

noteRouter.route({
  method: 'post',
  path: '/',
  validate: {
    body: {
      title: Joi.string().required(),
      text: Joi.string().required(),
    },
    type: 'json',
  },
  handler: NoteController.create,
});

noteRouter.route({
  method: 'put',
  path: '/:id',
  validate: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      title: Joi.string().optional(),
      text: Joi.string().optional(),
    },
    type: 'json',
  },
  handler: NoteController.update,
});

noteRouter.route({
  method: 'delete',
  path: '/:id',
  validate: {
    params: {
      id: Joi.string().required(),
    },
  },
  handler: NoteController.delete,
});

module.exports = noteRouter;