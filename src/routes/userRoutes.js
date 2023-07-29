const { Router } = require('restify-router');
const router = new Router();
const userController = require('../controller/userController');

router.post('', userController.createUser);
router.get('', userController.getUsers);
// router.get('/:id', userController.getUserById);

module.exports = router;
