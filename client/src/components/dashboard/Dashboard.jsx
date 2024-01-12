import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { InputTodo, ListTodos } from './todolist';

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState('');
	const [allTodos, setAllTodos] = useState([]);
	const [todosChange, setTodosChange] = useState(false);

	const getProfile = async () => {
		try {
			const response = await fetch(
				'http://localhost:5000/dashboard/',
				// 'https://perntodo-k667.onrender.com/dashboard/',
				{
					headers: { token: localStorage.token },
				}
			);

			const parsedResponse = await response.json();
			setName(parsedResponse[0].user_name);
			setAllTodos(parsedResponse);
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getProfile();
		setTodosChange(false);
	}, [todosChange]);

	const handleClick = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		setAuth(false);
		toast.success('Logged out successfully!');
	};

	return (
		<>
			{/* align not working */}
			<div className='d-flex justify-content-between align-items-center mt-3'>
				<p>{name}'s Todo List</p>
				<button className='btn btn-primary' onClick={(e) => handleClick(e)}>
					Logout
				</button>
			</div>
			<InputTodo setTodosChange={setTodosChange} />
			<ListTodos
				allTodos={allTodos}
				// setAllTodos={setAllTodos}
				setTodosChange={setTodosChange}
			/>
		</>
	);
};

export default Dashboard;
