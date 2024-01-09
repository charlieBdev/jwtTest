import React, { useState } from 'react';
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

function App() {
	/* eslint-disable no-unused-vars */
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	/* eslint-enable no-unused-vars */
	const setAuth = (bool) => {
		setIsAuthenticated(bool);
	};

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
		</>
	);
}

export default App;
