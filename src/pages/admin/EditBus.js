import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function EditBus() {

	const navigate = useNavigate();
	const location = useLocation();

	const [busData, setBusData] = useState({
		id: "",
		name: "",
		agencyId: ""
	})

	const [errorMessages, setErrorMessages] = useState({
		id: "",
		name: "",
		agencyId: ""
	})

	const [formError, setFormError] = useState(false);

	const handleEdit = (e) => {
		e.preventDefault();

		const message = {
			id: busData.id.length === 0 ? "ID tidak boleh kosong" : "",
			name: busData.name.length === 0 ? "Nama tidak boleh kosong" : "",
			agencyId: busData.agencyId.length === 0 ? "ID Agensi tidak boleh kosong" : ""
		}

		setErrorMessages(message);

		if (message.id.length > 0 || message.name.length > 0 || message.agencyId.length > 0) {
			return;
		}

		const searchParams = new URLSearchParams(location.search);
		const busId = searchParams.get('bus_id');

		axios
			.put(`http://localhost:8000/buses/${busId}`, busData)
			.then(res => {
				navigate('/admin/bus');
			})
			.catch(err => {
				setFormError(err.response.data)
			}
		)
	}

	const handleDelete = (e) => {
		e.preventDefault();

		const searchParams = new URLSearchParams(location.search);
		const busId = searchParams.get('bus_id');

		axios
			.delete(`http://localhost:8000/buses/${busId}`)
			.then(res => {
				navigate('/admin/bus');
			})
			.catch(err => {
				setFormError(err.response.data)
			}
		)
	}

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/admin');
		}

		const searchParams = new URLSearchParams(location.search);
		const busId = searchParams.get('bus_id');

		if (busId === null) {
			navigate('/admin/bus');
		}

		axios
			.get(`http://localhost:8000/buses/${busId}`)
			.then(res => {
				if (res.data === null || res.data === '') {
					navigate('/admin/bus');
					return
				}
				setBusData(res.data)
				setErrorMessages({
					id: "",
					name: "",
					agencyId: ""
				})
			})
			.catch(err => {
				navigate('/admin/bus');
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
							<label className="text3" htmlFor="id-bus">ID</label>
							<input 
								type="text" 
								id="id-bus" 
								name="id-bus" 
								placeholder="ID Bus" 
								value={busData.id}
								onChange={(e) => setBusData({...busData, id: e.target.value})}
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
								placeholder="Nama Bus" 
								value={busData.name}
								onChange={(e) => setBusData({...busData, name: e.target.value})}
								required
							/>
							<span className="error-message">{errorMessages.name}</span>
						</div>
						<div className="input-item">
							<label className="text3" htmlFor="id-agensi">ID Agensi</label>
							<input 
								type="text" 
								id="id-agensi" 
								name="id-agensi" 
								placeholder="ID Agensi" 
								value={busData.agencyId}
								onChange={(e) => setBusData({...busData, agencyId: e.target.value})}
								required
							/>
							<span className="error-message">{errorMessages.agencyId}</span>
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

export default EditBus;
