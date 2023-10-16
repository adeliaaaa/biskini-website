import React, { useEffect } from "react";
import PencilIconImage from "../../assets/PencilIcon.png"
import { Link, useNavigate } from "react-router-dom";

function Agensi() {

	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/admin');
		}
	})

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
								<tr>
									<td>TMB</td>
									<td>Trans Metro Bandung</td>
									<td>
										<Link to="/admin/agensi/edit" className="link-none">
											<button className="secondary small">
												<img src={PencilIconImage} alt="Pencil Icon" />
											</button>
										</Link>
									</td>
								</tr>
								<tr>
									<td>DAMRI</td>
									<td>DAMRI</td>
									<td>
										<Link to="/admin/agensi/edit" className="link-none">
											<button className="secondary small">
												<img src={PencilIconImage} alt="Pencil Icon" />
											</button>
										</Link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	);
}

export default Agensi;
