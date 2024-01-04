const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

// registering
router.post('/register', async (req, res) => {
	try {
		// 1 - destructure the req.body (name, email, pw)
		const { name, email, password } = req.body;

		// 2 - check user exists (if so, throw error)
		const existingUser = await pool.query(
			'SELECT * FROM users WHERE user_email = $1;',
			[email]
		);

		if (existingUser.rows.length !== 0) {
			// 401 - unauthorised
			// 403 - unauthenticated/forbidden
			return res.status(401).send('User already exists');
		}

		// res.json(existingUser.rows);

		// 3 - bcrypt the pw
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);

		const bcryptPassword = await bcrypt.hash(password, salt);
		// console.log(bcryptPassword);

		// 4 - enter the user inside our db
		const newUser = await pool.query(
			'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;',
			[name, email, bcryptPassword]
		);

		// res.json(newUser.rows[0]);

		// 5 - generate jwt token
		const token = jwtGenerator(newUser.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
