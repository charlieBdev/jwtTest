import React, { useEffect, useState } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
// components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure();

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (bool) => {
		setIsAuthenticated(bool);
	};

	const verify = async () => {
		try {
			const response = await fetch('http://localhost:5000/auth/verify', {
				// no need for method - GET is default
				headers: { token: localStorage.token },
			});

			const parsedResponse = await response.json();

			parsedResponse === true
				? setIsAuthenticated(true)
				: setIsAuthenticated(false);
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		verify();
	}, []);

	return (
		<>
			<Router>
				<div className='container'>
					<Routes>
						<Route
							exact
							path='/login'
							// render={(props) => <Login {...props} />}
							element={
								!isAuthenticated ? (
									<Login setAuth={setAuth} />
								) : (
									<Navigate to='/dashboard' />
								)
							}
						/>
						<Route
							exact
							path='/register'
							// render={(props) => <Register {...props} />}
							element={
								!isAuthenticated ? (
									<Register setAuth={setAuth} />
								) : (
									<Navigate to='/dashboard' />
								)
							}
						/>
						<Route
							exact
							path='/dashboard'
							// render={(props) => <Dashboard {...props} />}
							element={
								isAuthenticated ? (
									<Dashboard setAuth={setAuth} />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
