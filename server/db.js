const Pool = require('pg').Pool;

const ENV = process.env.NODE_ENV || 'development';

const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

console.log('Loading environment variables from:', pathToCorrectEnvFile);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
	throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config = {};

if (ENV === 'production') {
	config.connectionString = process.env.DATABASE_URL;
	config.max = 2;
}

const pool = new Pool(config);

module.exports = pool;
