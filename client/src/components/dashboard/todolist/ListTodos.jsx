import React, { useState, Fragment, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatTimestamp } from '../../../utils/formatTimestamp';
import EditTodo from './EditTodo';

const TodoCard = ({ todo, setTodosChange }) => {
	const formattedDate = formatTimestamp(todo.date_created);

	const handleDelete = async (id) => {
		const confirmDeletion = window.confirm(
			'Are you sure you want to delete this todo?'
		);

		if (!confirmDeletion) {
			return;
		}

		try {
			const response = await fetch(
				// `http://localhost:5000/dashboard/todos/${id}`,
				`https://pern-todo-auth.onrender.com/dashboard/todos/${id}`,
				{
					method: 'DELETE',
					headers: { token: localStorage.token },
				}
			);
			if (response.ok) {
				setTodosChange(true);
			}
		} catch (error) {
			console.error(error.message);
			alert('Failed to delete todo');
		}
	};

	return (
		<tr>
			<td>{todo.description}</td>
			<td>{formattedDate}</td>
			<td className='text-center'>
				<EditTodo todo={todo} setTodosChange={setTodosChange} />
			</td>
			<td className='text-center'>
				<button
					className='btn btn-danger'
					onClick={() => handleDelete(todo.todo_id)}
				>
					<AiOutlineDelete />
				</button>
			</td>
		</tr>
	);
};

const ListTodos = ({ allTodos, setTodosChange }) => {
	const [todos, setTodos] = useState([]);
	const [loading] = useState(false);

	useEffect(() => {
		setTodos(allTodos);
	}, [allTodos]);

	return (
		<Fragment>
			{loading ? (
				<div className='d-flex justify-content-center align-items-center h-100'>
					<p className='mt-3'>... loading todos ...</p>
				</div>
			) : (
				<div className='d-flex flex-column justify-content-center align-items-center h-100'>
					{todos.length !== 0 && todos[0].todo_id !== null ? (
						<p className='mt-3'>
							{todos.length} {todos.length !== 1 ? 'todos' : 'todo'}
						</p>
					) : (
						<p className='mt-3'>No todos</p>
					)}

					<table className='table table-hover'>
						<thead>
							<tr className=''>
								<th>Todo</th>
								<th>Created</th>
								<th className='text-center'>Edit</th>
								<th className='text-center'>Delete</th>
							</tr>
						</thead>
						<tbody>
							{todos.length !== 0 &&
								todos[0].todo_id !== null &&
								todos.map((todo) => (
									<TodoCard
										key={todo.todo_id}
										todo={todo}
										todos={todos}
										setTodos={setTodos}
										setTodosChange={setTodosChange}
									/>
								))}
						</tbody>
					</table>
				</div>
			)}
		</Fragment>
	);
};

export default ListTodos;
