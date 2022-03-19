const express = require('express');
const router = express.Router();
const isAdmin = require('../middleWares/isAdmin');
const auth = require('../middleWares/auth');

const {
	addProduct,
	updateProduct,
	toggleIsPublished,
	listPublishedProducts,
} = require('../controllers/product.ctrl');

router.post('/api/product', auth, isAdmin, addProduct);

router.get('/api/product', auth, listPublishedProducts);

router.put('/api/product/:product_id', auth, isAdmin, updateProduct);

router.put(
	'/api/product/toggleIsPublished/:product_id',
	auth,
	isAdmin,
	toggleIsPublished
);

module.exports = router;
