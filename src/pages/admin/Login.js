import React from "react";
import "../../styles/Admin.css"
import { useNavigate } from "react-router-dom";

function AdminLogin() {

	const navigate = useNavigate();

	const login = () => {
		localStorage.setItem('token', '123456abcdef');
		navigate('/admin/agensi');
	}

	return (
		<>
			<main className="admin-main">
				<div className="admin-container">
					<div className="page-heading center">
						<h3>Login</h3>
					</div>
					<form className="input-container">
						<div className="input-item">
							<label className="text3" htmlFor="username">Username</label>
							<input 
								type="text" 
								id="username" 
								name="username" 
								placeholder="Username" 
								required
							/>
							{/* <span className="error-message">{errorMessages.name}</span> */}
						</div>
						<div className="input-item">
							<label className="text3" htmlFor="password">Password</label>
							<input 
								type="password" 
								id="password" 
								name="password" 
								placeholder="Password" 
								required
							/>
							{/* <span className="error-message">{errorMessages.name}</span> */}
						</div>
						<button onClick={login}>LOGIN</button>
					</form>
				</div>
			</main>
		</>
	);
}

export default AdminLogin;
