const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signUp = async (req, res) => {
	req.body.email = req.body.email.toLowerCase();

	const { name, email, password } = req.body;
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

module.exports = {
	signUp,
};
