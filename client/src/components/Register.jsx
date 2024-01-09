import React, { useState } from 'react';

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		name: '',
	});

	const { email, password, name } = inputs;

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// necessary? can't just use inputs?
			const body = { email, password, name };

			const response = await fetch('http://localhost:5000/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const parsedResponse = await response.json();

			localStorage.setItem('token', parsedResponse.token);

			setAuth(true);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<h1 className='text-center my-5'>Register</h1>
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
				<input
					className='form-control my3'
					type='text'
					name='name'
					placeholder='name'
					value={name}
					onChange={(e) => handleChange(e)}
				/>
				<button className='btn btn-success my-3' type='submit'>
					Submit
				</button>
			</form>
		</>
	);
};

export default Register;
