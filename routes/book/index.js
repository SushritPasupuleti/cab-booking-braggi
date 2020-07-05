const router = require('express').Router();
const handle = require('../../handlers');

router.post('/book', handle.book);
router.post('/get-cabs', handle.getCabs);
router.post('/trip-done', handle.tripDone);
router.post('/get-to', handle.getTo);
router.post('/get-from', handle.getFrom);


module.exports = router;