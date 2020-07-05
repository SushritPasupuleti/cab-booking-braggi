const router = require('express').Router();
const handle = require('../../handlers');

router.post('/book', handle.book);
router.post('/getCabs', handle.getCabs);
router.post('/tripDone', handle.tripDone);

module.exports = router;