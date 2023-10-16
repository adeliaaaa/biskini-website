import React, { useEffect, useState } from "react";
import PencilIconImage from "../../assets/PencilIcon.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function BusAdmin() {

	const navigate = useNavigate();

	const [busData, setBusData] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/admin');
		}

		axios
			.get("http://localhost:8000/buses")
			.then(res => {
				setBusData(res.data)
			})
	}, [])

	return (
		<>
			<main className="admin-main h-nav">
				<div className="admin-container large">
					<div className="admin-heading">
						<div className="page-heading mx-0">
							<h3>Bus</h3>
						</div>
						<Link to="/admin/bus/add" className="link-none">
							<button className="secondary small">Tambah</button>
						</Link>
					</div>
					<div className="jadwal-ops-table admin-table">
						<table>
							<thead>
								<tr>
									<th className="id-col">ID</th>
									<th>Nama</th>
									<th>ID Agensi</th>
									<th className="action-col">Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									busData.map((bus, index) => (
										<tr key={bus.id}>
											<td>{bus.id}</td>
											<td>{bus.name}</td>
											<td>{bus.agencyId}</td>
											<td>
												<Link to={`/admin/bus/edit?bus_id=${bus.id}`} className="link-none">
													<button className="secondary small">
														<img src={PencilIconImage} alt="Pencil Icon" />
													</button>
												</Link>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	);
}

export default BusAdmin;
