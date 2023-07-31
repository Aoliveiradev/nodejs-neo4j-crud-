const { Router } = require('restify-router');
const router = new Router();
const userController = require('../controller/userController');

router.get('', userController.verifyJwt);

module.exports = router;
