const router = require('express').Router();
const handle = require('../../handlers');

router.post('/addUser', handle.addUser);
router.post('/addCab', handle.addCab);

module.exports = router;