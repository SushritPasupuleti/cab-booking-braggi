const router = require('express').Router();
const handle = require('../../handlers');

router.post('/book', handle.book);
router.post('/cabs-list', handle.getCabs);
router.post('/trip-done', handle.tripDone);
router.post('/dest-to', handle.getTo);
router.post('/dest-from', handle.getFrom);


module.exports = router;