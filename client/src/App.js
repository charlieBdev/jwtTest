import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	/* eslint-disable no-unused-vars */
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	/* eslint-enable no-unused-vars */

	return (
		<>
			<Router>
				<div className='container'>
					<Routes>
						<Route
							exact
							path='/login'
							// render={(props) => <Login {...props} />}
							element={<Login />}
						/>
						<Route
							exact
							path='/register'
							// render={(props) => <Register {...props} />}
							element={<Register />}
						/>
						<Route
							exact
							path='/dashboard'
							// render={(props) => <Dashboard {...props} />}
							element={<Dashboard />}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
