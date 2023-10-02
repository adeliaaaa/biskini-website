import React from "react";
import ChangeRouteIconImage from "../assets/ChangeRouteIcon.png";
import ArrowLeftIconImage from "../assets/ArrowLeftIcon.png";
import ArrowRightIconImage from "../assets/ArrowRightIcon.png";
import ArrowRightBoldIconImage from "../assets/ArrowRightBoldIcon.png";
import BusIconImage from "../assets/BusIcon.png";
import BusWhiteIconImage from "../assets/BusWhiteIcon.png";
import BulletIconImage from "../assets/BulletIcon.png";
import BulletNeutralFilledIconImage from "../assets/BulletNeutralFilled.png"
import BulletPrimaryFilledIconImage from "../assets/BulletPrimaryFilled.png"
import BulletSecondaryFilledIconImage from "../assets/BulletSecondaryFilled.png"
import BulletFilledIconImage from "../assets/BulletFilledIcon.png";
import MapRouteDummyImage from "../assets/MapRouteDummy.png"
import "../styles/Rute.css";
import routeData from "../data/route.json"
import BusLine from "../components/route/BusLine";
import ChooseSchedule from "../components/route/ChooseSchedule";
import ChooseSeat from "../components/route/ChooseSeat";
import Maps from "../components/route/Maps";

function Rute() {
	return (
		<>
			<main>
				<div className="route">
					{/* RUTE VIEW - 1 */}
					{/* <div className="route-info">
						<div className="page-heading">
							<h3 className="page-heading-color1">Info</h3>
							<h3 className="page-heading-color2">Rute</h3>
						</div>
						<div className="terminal-change">
							<div className="terminal-change-source">
								<p>{routeData.location_origin}</p>
								<hr />
								<p>{routeData.location_destination}</p>
							</div>
							<img src={ChangeRouteIconImage} className="terminal-change-icon" alt="Change Route Icon" />
						</div>
						<div className="route-data">
							{routeData.data.map((route, idx) => (
								<div className="route-item">
									<div className="route-name">
										<p>{route.terminal_name}</p>
									</div>
									{route.data.map((bus, idx) => (
										<div className="route-detail">
											<div className="route-source">
												<div className="route-source-terminal">
													<div className="route-source-terminal-name">
														<img src={BusIconImage} className="route-bus-icon" alt="Bus Icon" />
														<p>{bus.bus_name}</p>
													</div>
													<p>{bus.terminal_origin} - {bus.terminal_destination}</p>
												</div>
												<p>Berangkat pada {bus.departure_time} dari {bus.terminal_origin}</p>
											</div>
											<img src={ArrowRightIconImage} className="route-arrow-icon" alt="Arrow Right Icon" />
										</div>
									))}
								</div>
							))}
						</div>
					</div> */}
					
					{/* RUTE VIEW - 2 */}
					<div className="route-detail-bus-trip">
						<div className="route-detail-container">
							<div className="route-detail-info">
								<img src={ArrowLeftIconImage} className="route-arrow-icon" alt="Arrow Right Icon" />
								<div className="route-source">
									<div className="route-source-terminal">
										<div className="route-source-terminal-name dark">
											<img src={BusWhiteIconImage} className="route-bus-icon" alt="Bus Icon" />
											<p>TMB K1</p>
										</div>
										<p>Cibiru - Cibereum</p>
									</div>
									<div className="schedule-info">
										<p>Lihat Jadwal dan Rute Lengkap</p>
										<img src={ArrowRightBoldIconImage} className="route-arrow-icon-small" alt="Arrow Right Icon" />
									</div>
								</div>
							</div>
							<div className="terminal-change bg-none">
								<img src={ChangeRouteIconImage} className="terminal-change-icon" alt="Change Route Icon" />
								<div className="terminal-change-source bg-none">
									<p>{routeData.location_origin}</p>
									<p>{routeData.location_destination}</p>
								</div>
							</div>
						</div>

						{/* VIEW RUTE 2 */}
						<BusLine />
						<div className="trip-info">
							<div className="trip-time">
								<div className="title">
									<p>Estimasi Perjalanan</p>
								</div>
								<p className="trip-time-detail">10 menit</p>
							</div>
							<div className="trip-near-schedule">
								<div className="title">
									<p>Jadwal Terdekat</p>
								</div>
								<div className="trip-near-schedule-item">
									<p>13.15</p>
									<p>13.30</p>
									<p>13.45</p>
								</div>
							</div>
							<div className="trip-price">
								<p className="trip-price-title">Harga</p>
								<p className="trip-price-item">Rp10.000 - Rp15.000</p>
							</div>
							<button>PILIH JADWAL</button>
						</div>

						{/* VIEW RUTE 3 */}
						{/* <div className="date-picker-field">
							<form>
								<div className="input-item">
									<label htmlFor="date-picker">Tanggal Keberangkatan</label>
									<input type="date" id="date-picker" name="date-picker" />
								</div>
								<div className="input-item">
									<label htmlFor="number-picker">Jumlah Penumpang</label>
									<input type="number" id="number-picker" name="number-picker" />
								</div>
								<button>CARI JADWAL</button>
							</form>
						</div> */}

						{/* VIEW RUTE 4 */}
						{/* <div className="schedule-detail">
							<div className="page-heading">
								<h3 className="page-heading-color1">PILIHAN</h3>
								<h3 className="page-heading-color2">JADWAL</h3>
							</div>
							<div className="schedule">
								<div className="schedule-item">
									<p>Tujuan Keberangkatan</p>
									<div className="schedule-item-detail">
										<p>Halte Metro</p>
										<p>Pasar Caringin</p>
									</div>
								</div>
								<div className="schedule-item">
									<p>Tanggal Keberangkatan</p>
									<div className="schedule-item-detail">
										<p>30 September 2023</p>
										<p><span className="font-bold">13.15</span> - 13.48</p>
									</div>
								</div>
								<div className="schedule-item">
									<p>Jumlah Penumpang</p>
									<div className="schedule-item-detail">
										<p>2 Orang</p>
									</div>
								</div>
								<button>BAYAR</button>
							</div>
						</div> */}
					</div>
				</div>
				<div className="second-container">
					{/* <Maps /> */}
					{/* <div className="seats-container">
						<div className="page-heading">
							<h3 className="page-heading-color1">PILIHAN</h3>
							<h3 className="page-heading-color2">KURSI</h3>
						</div>
						<div className="color-desc">
							<p>Keterangan Warna</p>
							<div className="color-desc-detail">
								<div className="color-desc-item">
									<img src={BulletSecondaryFilledIconImage} alt="Bullet Filled Icon" />
									<p>Dipilih</p>
								</div>
								<div className="color-desc-item">
									<img src={BulletPrimaryFilledIconImage} alt="Bullet Filled Icon" />
									<p>Kosong</p>
								</div>
								<div className="color-desc-item">
									<img src={BulletNeutralFilledIconImage} alt="Bullet Filled Icon" />
									<p>Terisi</p>
								</div>
							</div>
						</div>
						<ChooseSeat />
					</div> */}
					{/* <div className="choose-schedule-container">
						<div className="page-heading">
							<h3 className="page-heading-color1">PILIHAN</h3>
							<h3 className="page-heading-color2">Jadwal</h3>
						</div>
						<div className="choose-schedule">
							<ChooseSchedule />
							<ChooseSchedule />
							<ChooseSchedule />
						</div>
					</div>
					<div className="bus-line-info">
						<div className="page-heading">
							<h3 className="page-heading-color1">Info</h3>
							<h3 className="page-heading-color2">Rute</h3>
						</div>
						<BusLine />
					</div> */}
				</div>
			</main>
		</>
	);
}

export default Rute;
