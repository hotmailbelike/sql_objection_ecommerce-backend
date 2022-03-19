const Product = require('../models/product.model');

/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {string} req.body.type
 * @param {string} req.body.category
 * @param {string} req.body.rating
 * @param {string} req.body.price
 * @param {string} req.body.isPublished
 */
const addProduct = async (req, res) => {
	try {
		const product = await Product.query().insert(req.body);
		res.json(product);
	} catch (error) {
		console.error('addProduct -> error', error.message);
		res.status(500).json({ error });
	}
};

/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {string} req.body.type
 * @param {string} req.body.category
 * @param {string} req.body.rating
 * @param {string} req.body.price
 * @param {string} req.body.isPublished
 * @param {Object} req.params
 * @param {number} req.params.product_id
 */
const updateProduct = async (req, res) => {
	const { product_id } = req.params;
	try {
		const product = await Product.query().patchAndFetchById(product_id, req.body);

		res.json(product);
	} catch (error) {
		console.error('updateProduct -> error', error.message);
		res.status(500).json({ error });
	}
};

/**
 * @param {Object} req
 * @param {Object} req.params
 * @param {number} req.params.product_id
 */
const toggleIsPublished = async (req, res) => {
	const { product_id } = req.params;
	try {
		const product = await Product.query().findById(product_id);
		let isPublished = product.isPublished;

		await product.$query().patchAndFetch({ isPublished: !isPublished });

		res.json(product);
	} catch (error) {
		console.error('toggleIsPublished -> error', error.message);
		res.status(500).json({ error });
	}
};

/**
 * @param {Object} req
 * @param {Object} req.query
 * @param {number} req.params.page
 * @param {number} req.params.limit
 */
const listPublishedProducts = async (req, res) => {
	const page = req.query.page ? parseInt(req.query.page) : 0;
	const limit = req.query.limit ? parseInt(req.query.limit) : 1000;

	try {
		const products = await Product.query()
			.where('isPublished', '=', true)
			.page(page, limit);

		res.json(products.results);
	} catch (error) {
		console.error('listPublishedProducts -> error', error.message);
		res.status(500).json({ error: errorHandler.getErrorMessage(error) });
	}
};

module.exports = {
	addProduct,
	updateProduct,
	toggleIsPublished,
	listPublishedProducts,
};
