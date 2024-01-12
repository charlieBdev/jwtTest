import React, { Fragment, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const InputTodo = ({ setTodosChange }) => {
	const [description, setDescription] = useState('');

	const handleSubmit = async (e) => {
		// stops page refresh
		e.preventDefault();

		if (description === '') {
			alert('Add a todo!');
			return;
		}

		try {
			const myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			myHeaders.append('token', localStorage.token);

			const body = { description };

			const response = await fetch(
				// 'http://localhost:5000/dashboard/todos',
				'https://pern-todo-auth.onrender.com/dashboard/todos',
				{
					method: 'POST',
					headers: myHeaders,
					body: JSON.stringify(body),
				}
			);

			// const parsedResponse = await response.json();
			// console.log(parsedResponse);

			if (!response.ok) {
				throw new Error('Failed to add todo');
			} else {
				setDescription('');
				setTodosChange(true);
			}
		} catch (error) {
			console.error(error.message);
			alert('Failed to add todo');
		}
	};

	return (
		<Fragment>
			<h1 className='text-center mt-5'>Input Todo</h1>
			<form className='mt-3' onSubmit={handleSubmit}>
				<div className='input-group'>
					<input
						type='text'
						className='form-control'
						placeholder='Write a todo...'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button type='submit' className='btn btn-success'>
						<IoMdAdd />
					</button>
				</div>
			</form>
		</Fragment>
	);
};

export default InputTodo;
