// const db = require('./connection');

// const seed = async () => {
// 	try {
// 		console.log('DATABASE_URL:', process.env.DATABASE_URL);

// 		console.log('Dropping table...');
// 		await db.query(`DROP TABLE IF EXISTS todo;`);
// 		console.log('Table dropped successfully');

// 		console.log('Creating table...');
// 		await db.query(`
//             CREATE TABLE todo (
//                 todo_id SERIAL PRIMARY KEY,
//                 description VARCHAR(250) NOT NULL,
//                 complete BOOLEAN DEFAULT false,
//                 date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                 date_completed TIMESTAMP
//             );
//         `);
// 		console.log('Table created successfully');
// 	} catch (error) {
// 		console.error(error);
// 	} finally {
// 		db.end();
// 	}
// };

// seed();
