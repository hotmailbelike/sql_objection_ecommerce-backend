//check if request is being made by Admin
module.exports = (req, res, next) => {
	try {
		const authorized = req.user.isAdmin;
		if (!authorized) {
			return res.status('403').json({
				error: 'User is not authorized',
			});
		}
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid Token' });
	}
};
