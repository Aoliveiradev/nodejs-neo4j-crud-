const restify = require('restify');
const {Router} = require("restify-router");
const corsMiddleware = require('restify-cors-middleware2')

const server = restify.createServer();
const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['http://localhost:3000', 'http://192.168.1.201:3000'],
    allowHeaders: ['API-Token', 'Authorization'],
    exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)
const router = new Router();
router.use(restify.plugins.bodyParser());
router.add("/users", require('./routes/userRoutes'));
router.add("/times", require('./routes/timeRoutes'));
router.add("/login", require('./routes/loginRoutes'));
router.applyRoutes(server);

module.exports = server;
