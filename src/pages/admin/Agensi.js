import React, { useEffect, useState } from "react";
import PencilIconImage from "../../assets/PencilIcon.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Agensi() {

	const navigate = useNavigate();

	const [agencyData, setAgencyData] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/admin');
		}

		axios
			.get("http://localhost:8000/agencies")
			.then(res => {
				console.log(res.data)
				setAgencyData(res.data)
			})

	}, [])

	return (
		<>
			<main className="admin-main h-nav">
				<div className="admin-container large">
					<div className="admin-heading">
						<div className="page-heading mx-0">
							<h3>Agensi</h3>
						</div>
						<Link to="/admin/agensi/add" className="link-none">
							<button className="secondary small">Tambah</button>
						</Link>
					</div>
					<div className="jadwal-ops-table admin-table">
						<table>
							<thead>
								<tr>
									<th className="id-col">ID</th>
									<th>Nama</th>
									<th className="action-col">Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									agencyData.map((agency, index) => (
										<tr key={agency.id + index}>
											<td>{agency.id}</td>
											<td>{agency.name}</td>
											<td>
												<Link to={`/admin/agensi/edit?agency_id=${agency.id}`} className="link-none">
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

export default Agensi;
