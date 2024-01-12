const formatTimestamp = (timestamp) => {
	const options = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: '2-digit',
	};

	const formattedDate = new Date(timestamp).toLocaleString('en-GB', options);
	return formattedDate;
};

export { formatTimestamp };
