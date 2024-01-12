import React, { Fragment, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

const EditTodo = ({ todo, setTodosChange }) => {
	const [description, setDescription] = useState(todo.description);

	useEffect(() => {
		setDescription(todo.description);
	}, [todo]);

	const handleEdit = async (id) => {
		if (description === '') {
			alert('Enter your edited todo');
			return;
		} else if (description !== todo.description) {
			try {
				const myHeaders = new Headers();
				myHeaders.append('Content-Type', 'application/json');
				myHeaders.append('token', localStorage.token);

				const body = { description };
				const response = await fetch(
					`http://localhost:5000/dashboard/todos/${id}`,
					// `https://perntodo-k667.onrender.com/dashboard/todos/${todo.todo_id}`,
					{
						method: 'PUT',
						headers: myHeaders,
						body: JSON.stringify(body),
					}
				);
				if (!response.ok) {
					throw new Error('Failed to edit todo');
				} else {
					setTodosChange(true);
				}
			} catch (error) {
				console.error(error.message);
				alert('Failed to edit todo');
			}
		} else {
			alert('No edits made');
		}
	};

	return (
		<Fragment>
			{/* <!-- Button to Open the Modal --> */}
			<button
				type='button'
				className='btn btn-warning'
				data-bs-toggle='modal'
				data-bs-target={`#id${todo.todo_id}`}
			>
				<CiEdit />
			</button>

			{/* <!-- The Modal --> */}
			<div
				className='modal fade'
				id={`id${todo.todo_id}`}
				onClick={() => {
					setDescription(todo.description);
				}}
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						{/* <!-- Modal Header --> */}
						<div className='modal-header'>
							<h4 className='modal-title'>Edit Todo</h4>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								onClick={() => {
									setDescription(todo.description);
								}}
							></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className='modal-body'>
							<input
								type='text'
								className='form-control'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						{/* <!-- Modal footer --> */}
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-success'
								data-bs-dismiss='modal'
								onClick={() => handleEdit(todo.todo_id)}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditTodo;
