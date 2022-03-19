const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Product = require('../models/product.model');

/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {boolean} req.body.isAdmin
 */
const signUp = async (req, res) => {
	req.body.email = req.body.email.toLowerCase();

	const { email, password } = req.body;
	try {
		let user = await User.query().findOne({ email });

		if (user) {
			return res.status(400).json({ error: 'User already exists' });
		}

		// user = new User({ name, email, password, isAdmin });

		const salt = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(password, salt);
		console.log('🚀 -> file: user.ctrl.js -> line 23 -> signUp -> req.body', req.body);

		user = await User.query().insert(req.body);

		const { id, isAdmin } = user;

		const payload = {
			user: {
				id,
				isAdmin,
			},
		};

		// remove the password from the object
		user.password = undefined;

		jwt.sign(
			payload,
			process.env.TOKEN_SECRET,
			{
				expiresIn: '28d',
			},
			(error, token) => {
				if (error) throw error;
				res.json({
					token,
					user,
				});
			}
		);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error });
	}
};

const signIn = async (req, res) => {
	req.body.email = req.body.email.toLowerCase();

	const { email, password } = req.body;

	try {
		let user = await User.query().findOne({ email });
		if (!user) {
			return res.status(400).json({ error: 'Invalid Credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid Credentials' });
		}

		const { id, isAdmin } = user;

		const payload = {
			user: {
				id,
				isAdmin,
			},
		};

		// remove the password from the object
		user.password = undefined;

		jwt.sign(
			payload,
			process.env.TOKEN_SECRET,
			{
				expiresIn: '28d',
			},
			(error, token) => {
				if (error) throw error;
				res.json({
					token,
					user,
				});
			}
		);
	} catch (error) {
		console.error('signIn -> error', error);
		res.status(500).json({ error });
	}
};

/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {number} req.body.product_id
 * @param {number} req.body.quantity
 * @param {Object} req.user
 * @param {number} req.user.id
 */
const addProductToCart = async (req, res) => {
	const { product_id, quantity } = req.body;
	try {
		let userQuery = User.query().findById(req.user.id);
		let productQuery = Product.query().findById(product_id);

		let [user, product] = await Promise.all([userQuery, productQuery]);

		let cartItems = [];

		if (user.cartItems) {
			cartItems = user.cartItems;
		}

		cartItems.push({
			name: product.name,
			price: product.price,
			quantity,
		});

		user = await user.$query().patchAndFetch({ cartItems });

		res.json(user);
	} catch (error) {
		console.error('addProductToCart -> error', error.message);
		res.status(500).json({ error });
	}
};

module.exports = {
	signUp,
	signIn,
	addProductToCart,
};
