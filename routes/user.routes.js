const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/user.ctrl');

router.post('/api/user', signUp);
module.exports = router;
