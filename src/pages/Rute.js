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
import terminalData from "../data/terminal.json"
import BusLine from "../components/route/BusLine";
import ChooseSchedule from "../components/route/ChooseSchedule";
import ChooseSeat from "../components/route/ChooseSeat";
import Maps from "../components/route/Maps";
import "../styles/Rute.css";
import { Link, useSearchParams } from "react-router-dom";
import DropDownSmall from "../components/route/DropDownSmall";

function Rute() {

	const [searchParams, setSearchParams] = useSearchParams();

	const [terminalOrigin, setTerminalOrigin] = useState(null);
	const [terminalDestination, setTerminalDestination] = useState(null);

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

	const reverseTerminal = () => {
		const tempOrigin = terminalOrigin;

		setTerminalOrigin(terminalDestination);
		setTerminalDestination(tempOrigin);
	}

	const updateBusId = (id) => {
		setBusId(id);
		updateBusData(id);
		// setIsSchedule(true);
		setSearchParams({ ...searchParams, bus_id: id });
	}

	const updateShowBusDetail = (id) => {
		setBusId(id);
		updateBusData(id);
		setIsSchedule(true);
		setSearchParams({ ...searchParams, bus_id: id, bus_detail: true });
	}

	const updateChooseSchedule = () => {
		setChooseSchedule(true);
		setSearchParams({ ...searchParams, bus_id: busId, bus_detail: true, choose_schedule: true });
	}

	const searchSchedule = (e) => {
		e.preventDefault();
		if (departureDate === "" || passengerCount === 0) {
			setDatePickerValidation(false);
		} else {
			setDatePickerValidation(true);
			setShowSchedule(true);
			setSearchParams({ ...searchParams, bus_id: busId, bus_detail: true, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount });
		}
	}

	const selectScheduleAction = (id, data = {}) => {
		setSelectedSchedule(id);
		setScheduleData(data);
		setSearchParams({ ...searchParams, bus_id: busId, bus_detail: true, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount, selected_schedule: id });
	}

	const unselectRoute = () => {
		if (searchParams.get('selected_schedule') !== null) {
			setSelectedSchedule(null);
			setScheduleData({});
			setSearchParams({ ...searchParams, bus_id: busId, bus_detail: true, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount });
		} else if (searchParams.get('choose_schedule') !== null) {
			setChooseSchedule(false);
			setSearchParams({ ...searchParams, bus_id: busId, bus_detail: true });
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
						return schedule;
					}
				}
			}
		}
		return {};
	}

	useEffect(() => {
		if (searchParams.get('bus_id') !== null) {
			setBusId(searchParams.get('bus_id'));
			updateBusData(searchParams.get('bus_id'));

			if (searchParams.get('bus_detail') !== null) {
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
						} else {
							setSelectedSchedule(-1);
							setScheduleData({});
						}
					} else {
						setDepartureDate("");
						setPassengerCount(0);
						setShowSchedule(false);
					}
				} else {
					setChooseSchedule(false);
				}
			} else {
				setIsSchedule(false);
			}


		} else {
			setBusId(null);
			updateBusData(null);
		}

		setTerminalOrigin(terminalData.terminal_data[0])
		setTerminalDestination(terminalData.terminal_data[1])

	}, [searchParams])

	return (
		<>
			<main>
			<div className={`route ${!chooseSchedule ? 'reverse' : ''}`}>
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
										<DropDownSmall 
											data={terminalData.terminal_data} 
											selectedData={terminalOrigin} 
											setSelectedData={setTerminalOrigin} 
											defaultMessage={'Pilih Terminal Keberangkatan'} 
										/>
										<hr />
										<DropDownSmall 
											data={terminalData.terminal_data} 
											selectedData={terminalDestination} 
											setSelectedData={setTerminalDestination} 
											defaultMessage={'Pilih Terminal Tujuan'} 
										/>
									</div>
									<img src={ChangeRouteIconImage} onClick={reverseTerminal} className="terminal-change-icon cursor-pointer" alt="Change Route Icon" />
								</div>
								<div className="route-data">
									{routeData.terminal_data?.map((route, idx) => (
										<div key={idx} className="route-item">
											<div className="route-name">
												<p className="text3">{route.terminal_name}</p>
											</div>
											{route.bus_data?.map((bus, idx) => (
												<div key={idx} className={`route-detail ${busId === bus.bus_id ? 'highlighted' : ''}`}>
													<div className="route-source cursor-pointer" onClick={() => updateBusId(bus.bus_id)}>
														<div className="route-source-terminal">
															<div className="route-source-terminal-name">
																<img src={BusIconImage} className="route-bus-icon" alt="Bus Icon" />
																<p className="text3">{bus.bus_name}</p>
															</div>
															<p className="text3">{bus.terminal_origin} - {bus.terminal_destination}</p>
														</div>
														{
															bus.schedule.length > 0 && (
																<p className="text3">Berangkat pada {bus.schedule[0].departure_time} dari {bus.terminal_origin}</p>
															)
														}
													</div>
													<img src={ArrowRightIconImage} className="route-arrow-icon cursor-pointer" onClick={() => updateShowBusDetail(bus.bus_id)} alt="Arrow Right Icon" />
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
													<p className="text3">{busData.bus_name}</p>
												</div>
												<p className="text3">{busData.terminal_origin} - {busData.terminal_destination}</p>
											</div>
											<div className="schedule-info">
												<p className="text3">Lihat Jadwal dan Rute Lengkap</p>
												<img src={ArrowRightBoldIconImage} className="route-arrow-icon-small" alt="Arrow Right Icon" />
											</div>
										</div>
									</div>
									{selectedSchedule === -1 && (
										<div className="terminal-change bg-none">
											<img src={ChangeRouteIconImage} onClick={reverseTerminal} className="terminal-change-icon cursor-pointer" alt="Change Route Icon" />
											<div className="terminal-change-source bg-none">
												<p className="text3">{terminalOrigin}</p>
												<p className="text3">{terminalDestination}</p>
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
														<p className="text3">Estimasi Perjalanan</p>
													</div>
													<p className="trip-time-detail text3">{busData.time_duration}</p>
												</div>
												<div className="trip-near-schedule">
													<div className="title">
														<p className="text3">Jadwal Terdekat</p>
													</div>
													<div className="trip-near-schedule-item">
														{
															busData.schedule?.map((schedule, idx) => (
																idx < 3 && (
																	<p key={idx} className="text3">{schedule.departure_time}</p>
																)
															))
														}
													</div>
												</div>
												<div className="trip-price">
													<p className="trip-price-title text3">Harga</p>
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
													<p className="text3">Pastikan telah memilih tanggal Keberangkatan dan jumlah penumpang</p>
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
													<p className="text3">Tujuan Keberangkatan</p>
													<div className="schedule-item-detail">
														<p className="text3">{busData.route[0].name}</p>
														<p className="text3">{busData.route[busData.route.length - 1].name}</p>
													</div>
												</div>
												<div className="schedule-item">
													<p className="text3">Tanggal Keberangkatan</p>
													<div className="schedule-item-detail">
														<p className="text3">{departureDate}</p>
														<p className="text3"><span className="font-bold">{scheduleData.departure_time}</span> - {scheduleData.arrival_time}</p>
													</div>
												</div>
												<div className="schedule-item">
													<p className="text3">Jumlah Penumpang</p>
													<div className="schedule-item-detail">
														<p className="text3">{passengerCount} Orang</p>
													</div>
												</div>
												<div className="schedule-item">
													<p className="text3">Harga</p>
													<p className="text1 schedule-item-price">{scheduleData?.price}</p>
												</div>
												<Link to="/data-diri" className="link-none">
													<button disabled={!isCanBuy}>ISI DATA DIRI</button>
												</Link>
											</div>
										</div>
									)
								}
							</div>
						)
					}
				</div>
				<div className={`second-container ${!chooseSchedule ? 'reverse' : ''}`}>
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
													busData.schedule?.map((schedule, idx) => (
														<ChooseSchedule key={idx} busData={busData} scheduleIdx={idx} passengerCount={passengerCount} selectScheduleAction={selectScheduleAction} />
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
									<BusLine routeData={busData.route  ? busData.route : routeData.terminal_data[0].bus_data[0].route} chooseSchedule={chooseSchedule} />
								</div>
							</>
						)
					}
					{
						selectedSchedule !== -1 && (
							// <div>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// 	<p>hahaha</p>
							// </div>
							<div className="seats-container">
								<div className="page-heading">
									<h3 className="page-heading-color1">PILIHAN</h3>
									<h3 className="page-heading-color2">KURSI</h3>
								</div>
								<div className="color-desc">
									<p className="text3">Keterangan Warna</p>
									<div className="color-desc-detail">
										<div className="color-desc-item">
											<img src={BulletSecondaryFilledIconImage} alt="Bullet Filled Icon" />
											<p className="text3">Dipilih</p>
										</div>
										<div className="color-desc-item">
											<img src={BulletPrimaryFilledIconImage} alt="Bullet Filled Icon" />
											<p className="text3">Kosong</p>
										</div>
										<div className="color-desc-item">
											<img src={BulletNeutralFilledIconImage} alt="Bullet Filled Icon" />
											<p className="text3">Terisi</p>
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
