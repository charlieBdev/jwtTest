import React, { useEffect, useState } from 'react';

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState('');

	const getName = async () => {
		try {
			const response = await fetch('http://localhost:5000/dashboard/', {
				// don't need this as GET is default
				method: 'GET',
				headers: { token: localStorage.token },
			});

			const parsedResponse = await response.json();
			console.log(parsedResponse);
			setName(parsedResponse.user_name);
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getName();
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		setAuth(false);
	};

	return (
		<>
			<h1 className='text-center my-5'>Dashboard</h1>
			<p>Hello, {name}</p>
			<button className='btn btn-primary' onClick={(e) => handleClick(e)}>
				Logout
			</button>
		</>
	);
};

export default Dashboard;
