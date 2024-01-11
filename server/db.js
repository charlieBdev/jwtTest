const Pool = require('pg').Pool;

const pool = new Pool({
	// user: 'charlesbishop',
	user: 'postgres',
	password: 'password',
	host: 'localhost',
	port: 5432,
	database: 'authtodolist',
});

module.exports = pool;
