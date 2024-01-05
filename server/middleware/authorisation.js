const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
	try {
		const jwtToken = req.header('token');
		// check token exists
		if (!jwtToken) {
			return res.status(403).json('You are not authorised');
		}
		// check token is valid
		const payload = jwt.verify(jwtToken, process.env.jwtSecret);

		req.user = payload.user;
		next();
	} catch (err) {
		console.error(err);
		return res.status(403).json('You are not authorised');
	}
};
