import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };

			const response = await fetch('http://localhost:5000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			// I added the if statement
			if (response.ok) {
				const parsedResponse = await response.json();

				localStorage.setItem('token', parsedResponse.token);

				setAuth(true);
			} else {
				console.log('You cannot do that');
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<h1 className='text-center my-5'>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					className='form-control my-3'
					type='email'
					name='email'
					placeholder='email'
					value={email}
					onChange={(e) => handleChange(e)}
				/>
				<input
					className='form-control my-3'
					type='password'
					name='password'
					placeholder='password'
					value={password}
					onChange={(e) => handleChange(e)}
				/>
				<button className='btn btn-success mb-3' type='submit'>
					Submit
				</button>
			</form>
			<Link to='/register'>Register</Link>
		</>
	);
};

export default Login;
