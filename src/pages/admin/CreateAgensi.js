import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAgensi() {

	const navigate = useNavigate();

	const [agencyData, setAgencyData] = useState({
		id: "",
		name: ""
	})

	const [errorMessages, setErrorMessages] = useState({
		id: "",
		name: ""
	})

	const [formError, setFormError] = useState(false);

	const handleAdd = (e) => {
		e.preventDefault();

		const message = {
			id: agencyData.id.length === 0 ? "ID tidak boleh kosong" : "",
			name: agencyData.name.length === 0 ? "Nama tidak boleh kosong" : ""
		}

		setErrorMessages(message);

		if (message.id.length > 0 || message.name.length > 0) {
			return;
		} 

		axios
			.post(`http://localhost:8000/agencies`, agencyData)
			.then(res => {
				navigate('/admin/agensi');
			})
			.catch(err => {
				setFormError(err.response.data)
			})
		
	}

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/admin');
		}
	}, [])

	return (
		<>
			<main className="admin-main h-nav">
				<div className="admin-container">
					<div className="page-heading center">
						<h3>Tambah agensi</h3>
					</div>
					<form className="input-container">
						<div className="input-item">
							<label className="text3" htmlFor="id-agensi">ID</label>
							<input 
								type="text" 
								id="id-agensi" 
								name="id-agensi" 
								placeholder="ID Agensi" 
								value={agencyData.id}
								onChange={(e) => setAgencyData({...agencyData, id: e.target.value})}
								required
							/>
							<span className="error-message">{errorMessages.id}</span>
						</div>
						<div className="input-item">
							<label className="text3" htmlFor="name">Nama</label>
							<input 
								type="text" 
								id="name" 
								name="name" 
								placeholder="Nama Agensi" 
								value={agencyData.name}
								onChange={(e) => setAgencyData({...agencyData, name: e.target.value})}
								required
							/>
							<span className="error-message">{errorMessages.name}</span>
						</div>
						<span className="error-message">{formError}</span>
						<button onClick={(e) => handleAdd(e)}>Tambah</button>
					</form>
				</div>
			</main>
		</>
	);
}

export default CreateAgensi;
