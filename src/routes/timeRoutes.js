const { Router } = require('restify-router');
const router = new Router();
const timeController = require('../controller/timesController');

router.post('', timeController.saveEntryExitTime);
router.get('/:userId/:date', timeController.getEntryExitTimesByDate);
router.del('/:userId/:timeId', timeController.deleteEntryExitTimeById);

module.exports = router;
