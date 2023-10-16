import React from "react";
import { Link } from "react-router-dom";

function EditAgensi() {
	return (
		<>
			<main className="admin-main h-nav">
				<div className="admin-container">
					<div className="page-heading center">
						<h3>Sunting agensi</h3>
					</div>
					<form className="input-container">
						<div className="input-item">
							<label className="text3" htmlFor="id-agensi">ID</label>
							<input 
								type="text" 
								id="id-agensi" 
								name="id-agensi" 
								placeholder="ID Agensi" 
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
								placeholder="Nama Agensi" 
								required
							/>
							{/* <span className="error-message">{errorMessages.name}</span> */}
						</div>
						<Link to="/admin/agensi" className="link-none mt-10">
							<button>Sunting</button>
						</Link>
						<Link to="/admin/agensi" className="link-none">
							<button className="secondary">Hapus</button>
						</Link>
					</form>
				</div>
			</main>
		</>
	);
}

export default EditAgensi;
