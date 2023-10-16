import React, { useState, useRef } from "react";
import DropDownButton from "../assets/InfoBusDropDown.png";
import SearchButton from "../assets/InfoBusSearch.png";
import InfoBusSelectAgent from "../assets/InfoBusSelect.png";
import InfoBus2Bike from "../assets/InfoBus2Bike.png";
import ArrowRightIcon from "../assets/InfoBus2ArrowRight.png";
import BusIconImage from "../assets/BusIcon.png";
import ArrowLeftIcon from "../assets/ArrowLeftIcon.png";
import BusLine from "../components/route/BusLine";
import ChangeRouteIconImage from "../assets/ChangeRouteIcon.png";

// import Maps from "../components/route/Maps";
import routeData from "../data/route.json";

import Footer from "../components/Footer";
import "../styles/Bus.css";

function Bus() {
	const page1 = [
		{
			id: "TMB",
			name: "Trans Metro Bandung",
			buses: [
				{
					id: "TMBK1",
				},
				{
					id: "TMBK2",
				},
			],
		},
		{
			id: "TMJ",
			name: "Trans Metro Jakarta",
			buses: [
				{
					id: "TMJK1",
				},
				{
					id: "TMJK2",
				},
			],
		},
	];

	const page2 = {
		id: "TMB",
		name: "Trans Metro Bandung",
		buses: [
			{
				id: "TMBK1",
				name: "TMB K1",
				origin: "Cibiru",
				destination: "Cicaheum",
			},
			{
				id: "TMBK2",
				name: "TMB K2",
				origin: "Cisitu",
				destination: "ITB",
			},

			{
				id: "TMBK3",
				name: "TMB K3",
				origin: "Cisitu",
				destination: "Bogor",
			},
		],
	};
	const [selectedAgensi, setSelectedAgensi] = useState("Pilih Agensi Bus");
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [chooseAgen, setChooseAgen] = useState(false);
	const [chooseAgenName, setChooseAgenName] = useState("");

	const [selectBus, setSelectBus] = useState(false);
	const [busName, setBusName] = useState("");

	const dropMenu = useRef(null);

	const closeOpenMenus = (e) => {
		if (
			dropMenu.current &&
			isDropDownOpen &&
			!dropMenu.current.contains(e.target)
		) {
			setIsDropDownOpen(false);
		}
	};

	document.addEventListener("mousedown", closeOpenMenus);

	const dropdownClicked = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

	const handleSelectAgen = (e) => {
		setSelectedAgensi(e.target.innerHTML);
		setIsDropDownOpen(false);
	};

	const searchAgen = () => {
		if (selectedAgensi === "Pilih Agensi Bus") {
			alert("Pilih agensi bus terlebih dahulu");
		} else {
			setChooseAgen(true);
			setChooseAgenName(selectedAgensi);
			setSelectBus(false);
		}
	};

	const handleSelectBus = (id, name) => {
		setSelectBus(true);
		setBusName(id, name);
	};

	return (
		<>
			<div className="title-section">
				<h1>
					Informasi <span>Bus</span>
				</h1>
				<div className="text1">Temukan informasi bus favoritmu</div>
				<div className="title-dropdown">
					<div className="dropdown-container text2" ref={dropMenu}>
						<div className="dropdown-text" onClick={dropdownClicked}>
							<span>{selectedAgensi}</span>
							<img src={DropDownButton} alt="dropdown" height={24} />
						</div>
						{isDropDownOpen && (
							<ul className="dropdown-lists">
								{page1.map((agen) => (
									<li
										className="dropdown-list"
										key={agen.id}
										onClick={handleSelectAgen}
									>
										{agen.name}
									</li>
								))}
							</ul>
						)}
					</div>
					<div className="dropdown-search">
						<button className="dropdown-search-button" onClick={searchAgen}>
							Cari
							<img
								src={SearchButton}
								alt="search"
								height={24}
								className="hide-in-mobile"
							/>
						</button>
					</div>
				</div>
			</div>
			{!chooseAgen && (
				<div className="info-section">
					<img src={InfoBusSelectAgent} alt="select agent" />
					<div className="info-desc">
						<h3>Pilih Agensi Bus Dahulu Ya</h3>
						<div className="text1">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</div>
				</div>
			)}
			{chooseAgen && (
				<div className="info-section">
					<div className="info2-title">
						<h3>{chooseAgenName}</h3>
						<div className="text1">
							Bus rute Bandung sejak 2004 yang melayani sebanyak 6 buah bus di
							Bandung dengan 62 pemberhentian.
						</div>
					</div>
					{!selectBus && (
						<div className="info2-jalur">
							<div className="jalur-container">
								<div className="jalur-title">
									<h4>Jalur</h4>
									<div className="jalur-text2">
										Untuk melihat Bis waktu, jadwal, dan pemberhentian yang
										diperbarui, silakan klik pada rute di bawah ini
									</div>
								</div>
								<div className="jalur-content">
									{page2.buses.map((bus) => (
										<div
											className="jalur-box"
											key={bus.id}
											onClick={() => handleSelectBus(bus.id, bus.name)}
										>
											<div className="jalur-bus-desc text3">
												<div className="jalur-name">
													<img src={BusIconImage} alt="bus" width={12} />
													{bus.name}
												</div>
												<div className="jalur-bus-dest">
													{bus.origin} - {bus.destination}
												</div>
											</div>
											<img src={ArrowRightIcon} alt="arrow" />
										</div>
									))}
								</div>
							</div>

							<img src={InfoBus2Bike} alt="jalur" />
						</div>
					)}
					{selectBus && (
						<>
							<div className="info3-bus">
								<div className="jalur-operasional">
									<div className="jalur-ops-head">
										<img src={ArrowLeftIcon} alt="bus" />
										<h3>{busName}</h3>
									</div>
									<div className="jalur-ops-title">
										<h4>Jalur Operasional</h4>
										<div className="text2">
											Untuk melihat Bis waktu, jadwal, dan pemberhentian yang
											diperbarui, silakan klik pada rute di bawah ini
										</div>
									</div>

									<div className="bus-line-container">
										<div className="bus-line-head">
											<img
												src={ChangeRouteIconImage}
												alt="Change Route Icon"
												width={28}
												height={28}
											/>
											<div className="text3">
												<div>{routeData.location_origin}</div>
												<div>{routeData.location_destination}</div>
											</div>
										</div>
										<BusLine
											routeData={routeData.terminal_data[0].bus_data[0].route}
										/>
									</div>
								</div>
								<div className="jadwal-operasional">
									<div className="jalur-ops-title">
										<h4>Jadwal Operasional</h4>
										<div className="text2">
											Untuk melihat Bis waktu, jadwal, dan pemberhentian yang
											diperbarui, silakan klik pada rute di bawah ini
										</div>
									</div>
									<div className="jadwal-ops-table">
										<table>
											<thead>
												<tr>
													<th>Hari</th>
													<th>Jadwal</th>
													<th>Frekuensi</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Senin</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
												<tr>
													<td>Selasa</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
												<tr>
													<td>Rabu</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
												<tr>
													<td>Kamis</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
												<tr>
													<td>Jumat</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
												<tr>
													<td>Sabtu</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
												<tr>
													<td>Minggu</td>
													<td>05.30 - 17.30</td>
													<td>40 menit</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="jadwal-ops-tarif">
										<h4>Tarif</h4>
										<div className="text2">
											Tarif berada di rentang{" "}
											<span className="color-red">
												Rp10.000 hingga Rp15.000
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="info3-bus">
								<div className="peta-jalur">
									<div className="peta-jlr-title">
										<h4>Peta Jalur</h4>
										<div className="text2">
											Untuk melihat Bis waktu, jadwal, dan pemberhentian yang
											diperbarui, silakan klik pada rute di bawah ini
										</div>
									</div>
									<div className="maps-container">
										{/* DISI ADELLINE */}
										{/* <Maps
										routeData={routeData.terminal_data[0].bus_data[0].route}
									/> */}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			)}
			<Footer />
		</>
	);
}

export default Bus;