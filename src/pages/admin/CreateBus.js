import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateBus() {

	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/admin');
		}
	})

	return (
		<>
			<main className="admin-main h-nav">
				<div className="admin-container">
					<div className="page-heading center">
						<h3>Tambah bus</h3>
					</div>
					<form className="input-container">
						<div className="input-item">
							<label className="text3" htmlFor="id-bus">ID</label>
							<input 
								type="text" 
								id="id-bus" 
								name="id-bus" 
								placeholder="ID Bus" 
								required
							/>
							{/* <span className="error-message">{errorMessages.name}</span> */}
						</div>
						<div className="input-item">
							<label className="text3" htmlFor="name">Nama</label>
							<input 
								type="text" 
								id="name" 
								name="name" 
								placeholder="Nama Bus" 
								required
							/>
							{/* <span className="error-message">{errorMessages.name}</span> */}
						</div>
						<div className="input-item">
							<label className="text3" htmlFor="id-agensi">ID Agensi</label>
							<input 
								type="text" 
								id="id-agensi" 
								name="id-agensi" 
								placeholder="ID Agensi" 
								required
							/>
							{/* <span className="error-message">{errorMessages.name}</span> */}
						</div>
						<Link to="/admin/bus" className="link-none">
							<button>Tambah</button>
						</Link>
					</form>
				</div>
			</main>
		</>
	);
}

export default CreateBus;
