const Koa = require('koa');
const respond = require('koa-respond');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const { routes } = require('./routes');

const app = new Koa();

require('./services/mongoConnection');

app.use(cors());
app.use(logger());
app.use(respond());

routes.forEach(route => app.use(route));

module.exports = app;
