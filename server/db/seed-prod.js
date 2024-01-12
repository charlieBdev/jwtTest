const db = require('../db');

const seed = async () => {
	try {
		console.log('DATABASE_URL:', process.env.DATABASE_URL);

		console.log('Dropping users table...');
		await db.query(`DROP TABLE IF EXISTS users;`);
		console.log('Users table dropped successfully');

		console.log('Dropping todos table...');
		await db.query(`DROP TABLE IF EXISTS todos;`);
		console.log('Todos table dropped successfully');

		// extention

		console.log('Creating extension...');
		await db.query('create extension if not exists "uuid-ossp";');
		console.log('Extension created successfully');

		// users table
		console.log('Creating users table...');
		await db.query(`
      CREATE TABLE users (
        user_id UUID DEFAULT uuid_generate_v4(),
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id)
      );
    `);
		console.log('Users table created successfully');

		// todos table
		console.log('Creating todos table...');
		await db.query(`
      CREATE TABLE todos (
        todo_id SERIAL,
        user_id UUID,
        description VARCHAR(255) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        complete BOOLEAN DEFAULT false,
        date_completed TIMESTAMP DEFAULT NULL,
        PRIMARY KEY (todo_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
		console.log('Todos table created successfully');
	} catch (error) {
		console.error(error);
	} finally {
		db.end();
	}
};

seed();
