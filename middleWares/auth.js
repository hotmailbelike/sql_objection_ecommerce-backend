const jwt = require('jsonwebtoken');

//append user _id to req.body
module.exports = (req, res, next) => {
	// get token from header
	// const token = req.header('x-auth-token');
	// or we can get Authorization from header
	if (!req.header('Authorization')) {
		return res.status(401).json({ error: 'No token, authorization denied' });
	}
	const token = req.header('Authorization').replace('Bearer ', '');

	//check if there is no token
	if (!token) {
		return res.status(401).json({ error: 'No token, authorization denied' });
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid Token' });
	}
};
