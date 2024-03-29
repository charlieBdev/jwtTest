const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorisation = require('../middleware/authorisation');

// registering
router.post('/register', validInfo, async (req, res) => {
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
			return res.status(401).json('User already exists');
		}

		// res.json(existingUser.rows);

		// 3 - bcrypt the pw
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);

		const bcryptPassword = await bcrypt.hash(password, salt);

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

// login
router.post('/login', validInfo, async (req, res) => {
	try {
		// 1 - destructure res.body
		const { email, password } = req.body;

		// 2 - check if user exists (if not, throw error)
		const user = await pool.query(
			'SELECT * FROM users WHERE user_email = $1;',
			[email]
		);

		if (user.rows.length === 0) {
			// 401 - unauthorised
			// 403 - unauthenticated/forbidden
			return res.status(403).json('Password or Email is incorrect');
		}

		// 3 - check if incoming pw matches decrypted db pw

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);

		if (!validPassword) {
			return res.status(403).json('Password or Email is incorrect');
		}

		// 4 - give them the/a jwt token
		const token = jwtGenerator(user.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//

router.get('/verify', authorisation, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
