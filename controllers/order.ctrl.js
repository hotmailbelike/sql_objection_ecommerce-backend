const Order = require('../models/order.model');
const postmark = require('postmark');
let client = new postmark.ServerClient(process.env.POSTMARK_KEY);

/**
 * @param {Object} req
 * @param {Object} req.body
 */
const placeOrder = async (req, res) => {
	try {
		const order = await Order.query().insert(req.body);

		if (order) {
			await client.sendEmail({
				From: '1611216@iub.edu.bd',
				To: email,
				Subject: 'Your order has been placed!',
				TextBody: 'It will be delivered in 5 days',
				// HtmlBody:""
			});
		}

		res.json(order);
	} catch (error) {
		console.error('addProduct -> error', error.message);
		res.status(500).json({ error });
	}
};

module.exports = {
	placeOrder,
};
