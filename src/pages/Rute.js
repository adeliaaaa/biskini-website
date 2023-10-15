import React, { useEffect, useState } from "react";
import ChangeRouteIconImage from "../assets/ChangeRouteIcon.png";
import ArrowLeftIconImage from "../assets/ArrowLeftIcon.png";
import ArrowRightIconImage from "../assets/ArrowRightIcon.png";
import ArrowRightBoldIconImage from "../assets/ArrowRightBoldIcon.png";
import BusIconImage from "../assets/BusIcon.png";
import BusWhiteIconImage from "../assets/BusWhiteIcon.png";
import BulletNeutralFilledIconImage from "../assets/BulletNeutralFilled.png"
import BulletPrimaryFilledIconImage from "../assets/BulletPrimaryFilled.png"
import BulletSecondaryFilledIconImage from "../assets/BulletSecondaryFilled.png"
import routeData from "../data/route.json"
import BusLine from "../components/route/BusLine";
import ChooseSchedule from "../components/route/ChooseSchedule";
import ChooseSeat from "../components/route/ChooseSeat";
import Maps from "../components/route/Maps";
import "../styles/Rute.css";
import { useSearchParams } from "react-router-dom";

function Rute() {

	const [searchParams, setSearchParams] = useSearchParams();

	const [busId, setBusId] = useState(null);

	const [busData, setBusData] = useState({});
	

	const [isSchedule, setIsSchedule] = useState(false);

	const [chooseSchedule, setChooseSchedule] = useState(false);

	const [showSchedule, setShowSchedule] = useState(false);

	const [selectedSchedule, setSelectedSchedule] = useState(-1); 

	const [scheduleData, setScheduleData] = useState({}); 

	const [isCanBuy, setIsCanBuy] = useState(false);


	const [departureDate, setDepartureDate] = useState("");
	const [passengerCount, setPassengerCount] = useState(0);
	const [datePickerValidation, setDatePickerValidation] = useState(true);

	const updateBusId = (id) => {
		setBusId(id);
		updateBusData(id);
		setIsSchedule(true);
		setSearchParams({ ...searchParams, bus_id: id });
	}

	const updateChooseSchedule = () => {
		setChooseSchedule(true);
		setSearchParams({ ...searchParams, bus_id: busId, choose_schedule: true });
	}

	const searchSchedule = (e) => {
		e.preventDefault();
		if (departureDate === "" || passengerCount === 0) {
			setDatePickerValidation(false);
		} else {
			setDatePickerValidation(true);
			setShowSchedule(true);
			setSearchParams({ ...searchParams, bus_id: busId, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount });
		}
	}

	const selectScheduleAction = (id, data = {}) => {
		setSelectedSchedule(id);
		setScheduleData(data);
		setSearchParams({ ...searchParams, bus_id: busId, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount, selected_schedule: id });
	}

	const unselectRoute = () => {
		if (searchParams.get('selected_schedule') !== null) {
			setSelectedSchedule(null);
			setScheduleData({});
			setSearchParams({ ...searchParams, bus_id: busId, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount });
		} else if (searchParams.get('choose_schedule') !== null) {
			setChooseSchedule(false);
			setSearchParams({ ...searchParams, bus_id: busId });
		} else {
			setBusId(null);
			updateBusData(null);
			setIsSchedule(false);
			setSearchParams({});
		}
	}

	const updateBusData = (busId) => {
		if (busId) {

			routeData.terminal_data.forEach((terminal) => {
				terminal.bus_data.forEach((bus) => {
					if (bus.bus_id === busId) {
						setBusData(bus);
						console.log(busId)
						console.log(bus);
					}
				})
			})
		} else {
			setBusData({});
		}
		
	}

	const findScheduleById = (scheduleId) => {
		for (const terminal of routeData.terminal_data) {
			for (const bus of terminal.bus_data) {
				for (const schedule of bus.schedule) {
					if (schedule.schedule_id === scheduleId) {
						return schedule; // Found the schedule with the specified ID
					}
				}
			}
		}
		return {}; // Schedule not found
	}

	useEffect(() => {
		if (searchParams.get('bus_id') !== null) {
			setBusId(searchParams.get('bus_id'));
			updateBusData(searchParams.get('bus_id'));
			setIsSchedule(true);

			if (searchParams.get('choose_schedule') !== null) {
				setChooseSchedule(true);
				
				if (searchParams.get('departure_date') !== null && searchParams.get('passenger_count') !== null) {
					setDepartureDate(searchParams.get('departure_date'));
					setPassengerCount(parseInt(searchParams.get('passenger_count')));

					setShowSchedule(true);

					if (searchParams.get('selected_schedule') !== null) {
						const selectedScheduleId = searchParams.get('selected_schedule');
						setSelectedSchedule(selectedScheduleId);
						setScheduleData(findScheduleById(selectedScheduleId));
						console.log(findScheduleById(selectedScheduleId))
					}
				}
			}
		}
	}, [searchParams])

	return (
		<>
			<main>
				<div className="route">
					{/* RUTE VIEW - 1 */}
					{
						!isSchedule && (
							<div className="route-info">
								<div className="page-heading">
									<h3 className="page-heading-color1">Info</h3>
									<h3 className="page-heading-color2">Rute {isSchedule}</h3>
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
									{routeData.terminal_data.map((route, idx) => (
										<div className="route-item">
											<div className="route-name">
												<p>{route.terminal_name}</p>
											</div>
											{route.bus_data.map((bus, idx) => (
												<div className="route-detail">
													<div className="route-source">
														<div className="route-source-terminal">
															<div className="route-source-terminal-name">
																<img src={BusIconImage} className="route-bus-icon" alt="Bus Icon" />
																<p>{bus.bus_name}</p>
															</div>
															<p>{bus.terminal_origin} - {bus.terminal_destination}</p>
														</div>
														{
															bus.schedule.length > 0 && (
																<p>Berangkat pada {bus.schedule[0].departure_time} dari {bus.terminal_origin}</p>
															)
														}
													</div>
													<img src={ArrowRightIconImage} className="route-arrow-icon" onClick={() => updateBusId(bus.bus_id)} alt="Arrow Right Icon" />
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						)
					}
					
					{
						isSchedule && (
							<div className="route-detail-bus-trip">
								<div className="route-detail-container">
									<div className="route-detail-info">
										<img src={ArrowLeftIconImage} className="route-arrow-icon cursor-pointer" alt="Arrow Right Icon" onClick={unselectRoute} />
										<div className="route-source">
											<div className="route-source-terminal">
												<div className="route-source-terminal-name dark">
													<img src={BusWhiteIconImage} className="route-bus-icon" alt="Bus Icon" />
													<p>{busData.bus_name}</p>
												</div>
												<p>{busData.terminal_origin} - {busData.terminal_destination}</p>
											</div>
											<div className="schedule-info">
												<p>Lihat Jadwal dan Rute Lengkap</p>
												<img src={ArrowRightBoldIconImage} className="route-arrow-icon-small" alt="Arrow Right Icon" />
											</div>
										</div>
									</div>
									{selectedSchedule === -1 && (
										<div className="terminal-change bg-none">
											<img src={ChangeRouteIconImage} className="terminal-change-icon" alt="Change Route Icon" />
											<div className="terminal-change-source bg-none">
												<p>{routeData.location_origin}</p>
												<p>{routeData.location_destination}</p>
											</div>
										</div>
									)}
								</div>

								{
									!chooseSchedule && selectedSchedule === -1 && (
										<>
											<BusLine routeData={busData.route  ? busData.route : routeData.terminal_data[0].bus_data[0].route} />
											<div className="trip-info">
												<div className="trip-time">
													<div className="title">
														<p>Estimasi Perjalanan</p>
													</div>
													<p className="trip-time-detail">{busData.time_duration}</p>
												</div>
												<div className="trip-near-schedule">
													<div className="title">
														<p>Jadwal Terdekat</p>
													</div>
													<div className="trip-near-schedule-item">
														{
															busData.schedule.map((schedule, idx) => (
																idx < 3 && (
																	<p>{schedule.departure_time}</p>
																)
															))
														}
													</div>
												</div>
												<div className="trip-price">
													<p className="trip-price-title">Harga</p>
													<p className="trip-price-item">{busData.min_price} - {busData.max_price}</p>
												</div>
												<button onClick={updateChooseSchedule}>PILIH JADWAL</button>
											</div>
										</>
									) 
								}
								{	
									chooseSchedule && selectedSchedule === -1 &&
									(
										<div className="date-picker-field">
											<form>
												<div className="input-item">
													<label htmlFor="departure-date">Tanggal Keberangkatan</label>
													<input type="date" id="departure-date" name="departure-date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
												</div>
												<div className="input-item">
													<label htmlFor="passenger-count">Jumlah Penumpang</label>
													<input type="number" id="passenger-count" name="passenger-count" value={passengerCount} onChange={(e) => setPassengerCount(e.target.value)} />
												</div>
												{!datePickerValidation && (
													<p>Pastikan telah memilih tanggal Keberangkatan dan jumlah penumpang</p>
												)}
												<button onClick={(e) => searchSchedule(e)}>CARI JADWAL</button>
											</form>
										</div>
									)
								}

								{
									selectedSchedule !== -1 && (
										<div className="schedule-detail">
											<div className="page-heading">
												<h3 className="page-heading-color1">PILIHAN</h3>
												<h3 className="page-heading-color2">JADWAL</h3>
											</div>
											<div className="schedule">
												<div className="schedule-item">
													<p>Tujuan Keberangkatan</p>
													<div className="schedule-item-detail">
														<p>{busData.route[0].name}</p>
														<p>{busData.route[busData.route.length - 1].name}</p>
													</div>
												</div>
												<div className="schedule-item">
													<p>Tanggal Keberangkatan</p>
													<div className="schedule-item-detail">
														<p>{departureDate}</p>
														<p><span className="font-bold">{scheduleData.departure_time}</span> - {scheduleData.arrival_time}</p>
													</div>
												</div>
												<div className="schedule-item">
													<p>Jumlah Penumpang</p>
													<div className="schedule-item-detail">
														<p>{passengerCount} Orang</p>
													</div>
												</div>
												<button disabled={!isCanBuy}>BAYAR</button>
											</div>
										</div>
									)
								}
							</div>
						)
					}
				</div>
				<div className="second-container">
					{!chooseSchedule && selectedSchedule === -1 && (
						<Maps routeData={busData.route  ? busData.route : routeData.terminal_data[0].bus_data[0].route} />
					)}
					{
						chooseSchedule && selectedSchedule === -1 && (
							<>
								<div className="choose-schedule-container">
									<div className="page-heading">
										<h3 className="page-heading-color1">PILIHAN</h3>
										<h3 className="page-heading-color2">Jadwal</h3>
									</div>
									<div className="choose-schedule">
										{
											showSchedule ? (
												busData.schedule.length > 0 ? (
													busData.schedule.map((schedule, idx) => (
														<ChooseSchedule busData={busData} scheduleIdx={idx} passengerCount={passengerCount} selectScheduleAction={selectScheduleAction} />
													))
												) : (
													<p>Tidak ada jadwal yang tersedia</p>
												)
											) : (
												<p>Belum ada jadwal yang dipilih</p>
											)
										}
									</div>
								</div>
								<div className="bus-line-info">
									<div className="page-heading">
										<h3 className="page-heading-color1">Info</h3>
										<h3 className="page-heading-color2">Rute</h3>
									</div>
									<BusLine routeData={busData.route  ? busData.route : routeData.terminal_data[0].bus_data[0].route}  />
								</div>
							</>
						)
					}
					{
						selectedSchedule !== -1 && (
							<div className="seats-container">
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
								<ChooseSeat 
									seatAvailable={scheduleData.seat_available} 
									passengerCount={passengerCount} 
									setIsCanBuy={setIsCanBuy}
								/>
							</div>
						)
					}
				</div>
			</main>
		</>
	);
}

export default Rute;
