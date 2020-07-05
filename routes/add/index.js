const router = require('express').Router();
const handle = require('../../handlers');

router.post('/add-user', handle.addUser);
router.post('/add-cab', handle.addCab);

module.exports = router;