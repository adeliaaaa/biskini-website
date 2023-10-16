import React, { useEffect } from "react";
import PencilIconImage from "../../assets/PencilIcon.png"
import { Link, useNavigate } from "react-router-dom";

function BusAdmin() {

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
								<tr>
									<td>TMBK1</td>
									<td>TMB K1</td>
									<td>TMB</td>
									<td>
										<Link to="/admin/bus/edit" className="link-none">
											<button className="secondary small">
												<img src={PencilIconImage} alt="Pencil Icon" />
											</button>
										</Link>
									</td>
								</tr>
								<tr>
									<td>TMBK2</td>
									<td>TMB K2</td>
									<td>TMB</td>
									<td>
										<Link to="/admin/bus/edit" className="link-none">
											<button className="secondary small">
												<img src={PencilIconImage} alt="Pencil Icon" />
											</button>
										</Link>
									</td>
								</tr>
								<tr>
									<td>TMBK3</td>
									<td>TMB K3</td>
									<td>TMB</td>
									<td>
										<Link to="/admin/bus/edit" className="link-none">
											<button className="secondary small">
												<img src={PencilIconImage} alt="Pencil Icon" />
											</button>
										</Link>
									</td>
								</tr>
								<tr>
									<td>DAMRIK1</td>
									<td>DAMRI K1</td>
									<td>TMB</td>
									<td>
										<Link to="/admin/bus/edit" className="link-none">
											<button className="secondary small">
												<img src={PencilIconImage} alt="Pencil Icon" />
											</button>
										</Link>
									</td>
								</tr>
								<tr>
									<td>DAMRIK2</td>
									<td>DAMRI K2</td>
									<td>TMB</td>
									<td>
										<Link to="/admin/bus/edit" className="link-none">
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

export default BusAdmin;
