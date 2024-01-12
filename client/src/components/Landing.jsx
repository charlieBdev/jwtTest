import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className='mt-3 p-5 bg-secondary-subtle rounded'>
			<h1>Welcome to Todo City</h1>
			<p>Sign in and start building your todo list</p>
			<Link to='/login' className='btn btn-primary'>
				Login
			</Link>
			<Link to='/register' className='btn btn-primary ml-3'>
				Register
			</Link>
		</div>
	);
};

export default Landing;
