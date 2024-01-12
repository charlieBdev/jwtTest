const app = require('./index');

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`);
});
