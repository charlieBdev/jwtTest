const app = require('./index');

const { PORT = 9090 } = process.env;
// const { PORT = 5000 } = process.env;

// app.listen(5000, () => {
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`);
});
