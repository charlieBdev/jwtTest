import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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

			// const response = await fetch('http://localhost:5000/auth/register', {
			const response = await fetch(
				'https://pern-todo-auth.onrender.com/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}
			);

			const parsedResponse = await response.json();

			if (parsedResponse.token) {
				localStorage.setItem('token', parsedResponse.token);

				setAuth(true);

				toast.success('Registered successfully!');
			} else {
				setAuth(false);
				toast.error(parsedResponse);
			}
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
					className='form-control my-3'
					type='text'
					name='name'
					placeholder='name'
					value={name}
					onChange={(e) => handleChange(e)}
				/>
				<button className='btn btn-success mb-3' type='submit'>
					Submit
				</button>
			</form>
			<Link to='/login' className='btn btn-primary'>
				Login
			</Link>
			<Link to='/' className='btn btn-primary ml-3'>
				Back
			</Link>
		</>
	);
};

export default Register;
