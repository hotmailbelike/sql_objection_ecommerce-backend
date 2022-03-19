const express = require('express');
const router = express.Router();
const auth = require('../middleWares/auth');

const { signUp, signIn, addProductToCart } = require('../controllers/user.ctrl');

router.post('/api/user', signUp);
router.post('/api/auth', signIn);
router.put('/api/user/addToCart', auth, addProductToCart);

module.exports = router;
