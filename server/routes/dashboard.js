const router = require('express').Router();
const pool = require('../db');
const authorisation = require('../middleware/authorisation');

// all todos and name

router.get('/', authorisation, async (req, res) => {
	try {
		// const user = await pool.query(
		//   "SELECT user_name FROM users WHERE user_id = $1",
		//   [req.user.id]
		// );

		const user = await pool.query(
			'SELECT u.user_name, t.todo_id, t.description, t.date_created, t.complete FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1;',
			[req.user.id]
		);

		res.json(user.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json('Server Error');
	}
});

// create a todo

router.post('/todos', authorisation, async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *;',
			[req.user.id, description]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json('Server Error');
	}
});

// update a todo

router.put('/todos/:id', authorisation, async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updatedTodo = await pool.query(
			'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *;',
			[description, id, req.user.id]
		);

		if (updatedTodo.rows.length === 0) {
			return res.json('This todo is not yours');
		}

		res.json(updatedTodo.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json('Server Error');
	}
});

// delete a todo

router.delete('/todos/:id', authorisation, async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTodo = await pool.query(
			'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *;',
			[id, req.user.id]
		);

		if (deletedTodo.rows.length === 0) {
			return res.json('This todo is not yours');
		}

		res.json('Todo was deleted');
	} catch (err) {
		console.error(err);
		res.status(500).json('Server Error');
	}
});

module.exports = router;
