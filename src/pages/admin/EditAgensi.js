import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function EditAgensi() {

	const navigate = useNavigate();
	const location = useLocation();

	const [agencyData, setAgencyData] = useState({
		id: "",
		name: ""
	})

	const [errorMessages, setErrorMessages] = useState({
		id: "",
		name: ""
	})

	const [formError, setFormError] = useState(false);

	const handleEdit = (e) => {
		e.preventDefault();

		const message = {
			id: agencyData.id.length === 0 ? "ID tidak boleh kosong" : "",
			name: agencyData.name.length === 0 ? "Nama tidak boleh kosong" : ""
		}

		setErrorMessages(message);

		if (message.id.length > 0 || message.name.length > 0) {
			return;
		} 

		const searchParams = new URLSearchParams(location.search);
		const agencyId = searchParams.get('agency_id');

		axios
			.put(`http://localhost:8000/agencies/${agencyId}`, agencyData)
			.then(res => {
				navigate('/admin/agensi');
			})
			.catch(err => {
				setFormError(err.response.data)
			})
		
	}

	const handleDelete = (e) => {
		e.preventDefault();

		const searchParams = new URLSearchParams(location.search);
		const agencyId = searchParams.get('agency_id');

		axios
			.delete(`http://localhost:8000/agencies/${agencyId}`)
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
		const searchParams = new URLSearchParams(location.search);
		const agencyId = searchParams.get('agency_id');
		
		if (agencyId === null) {
			navigate('/admin/agensi');
		}

		axios
			.get(`http://localhost:8000/agencies/${agencyId}`)
			.then(res => {
				if (res.data === null || res.data === '') {
					navigate('/admin/agensi');
					return
				}

				setAgencyData(res.data)
				setErrorMessages({
					id: "",
					name: ""
				})
			})
			.catch(err => {
				navigate('/admin/agensi');
			})
		
	}, [])

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
								value={agencyData.id}
								disabled
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
						<button onClick={(e) => handleEdit(e)}>Sunting</button>
						<button onClick={(e) => handleDelete(e)} className="secondary">Hapus</button>
					</form>
				</div>
			</main>
		</>
	);
}

export default EditAgensi;
