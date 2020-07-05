const router = require('express').Router();
const handle = require('../../handlers');

router.post('/generate-otp', handle.generateOTP);
router.post('/verify-otp', handle.verifyOTP);

module.exports = router;