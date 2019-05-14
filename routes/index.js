const userRouter = require('../routes/user');
const noteRouter = require('../routes/note');

module.exports = {
  routes: [
    userRouter.middleware(),
    noteRouter.middleware(),
  ],
};