import axios from "axios";
import React, { useEffect, useState } from "react";
import ArrowLeftIconImage from "../assets/ArrowLeftIcon.png";
import ArrowRightIconImage from "../assets/ArrowRightIcon.png";
import ArrowRightBoldIconImage from "../assets/ArrowRightBoldIcon.png";
import BusIconImage from "../assets/BusIcon.png";
import BusWhiteIconImage from "../assets/BusWhiteIcon.png";
import BulletNeutralFilledIconImage from "../assets/BulletNeutralFilled.png"
import BulletPrimaryFilledIconImage from "../assets/BulletPrimaryFilled.png"
import BulletSecondaryFilledIconImage from "../assets/BulletSecondaryFilled.png"
import ChangeRouteIconImage from "../assets/ChangeRouteIcon.png";
import routeData from "../data/route.json"
import terminalData from "../data/terminal.json"
import BusLine from "../components/route/BusLine";
import ChooseSchedule from "../components/route/ChooseSchedule";
import ChooseSeat from "../components/route/ChooseSeat";
import Maps from "../components/route/Maps";
import "../styles/Rute.css";
import { useSearchParams } from "react-router-dom";
import DropDownSmall from "../components/route/DropDownSmall";
import PersonalDataPayment from "../components/route/PersonalDataPayment";

function Rute() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [terminalOriginData, setTerminalOriginData] = useState([]);

	const [terminalDestinationData, setTerminalDestinationData] = useState([]);

	const [terminalOrigin, setTerminalOrigin] = useState(null);

	const [terminalDestination, setTerminalDestination] = useState(null);

	const [busesData, setBusesData] = useState(null);

	const [busId, setBusId] = useState(null);

	const [busData, setBusData] = useState({});

	const [busSchedule, setBusSchedule] = useState(null);

	const [isSchedule, setIsSchedule] = useState(false);

	const [chooseSchedule, setChooseSchedule] = useState(false);

	const [showSchedule, setShowSchedule] = useState(false);

	const [selectedSchedule, setSelectedSchedule] = useState(-1); 

	const [scheduleData, setScheduleData] = useState({}); 

	const [selectedSeats, setSelectedSeats] = useState([]);

	const [isCanBuy, setIsCanBuy] = useState(false);

	const [totalPrice, setTotalPrice] = useState(0);

	const [availableSeat, setAvailableSeat] = useState(0);


	const [departureDate, setDepartureDate] = useState("");

	const [passengerCount, setPassengerCount] = useState(0);
	
	const [datePickerValidation, setDatePickerValidation] = useState(true);

	const [isPersonalData, setIsPersonalData] = useState(false);

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
		setSearchParams({ ...searchParams, bus_id: id, origin: terminalOrigin, destination: terminalDestination, bus_detail: true });
	}

	const updateChooseSchedule = () => {
		setChooseSchedule(true);
		setSearchParams({ ...searchParams, bus_id: busId, origin: terminalOrigin, destination: terminalDestination, bus_detail: true, choose_schedule: true });
	}

	const searchSchedule = (e) => {
		e.preventDefault();
		if (departureDate === "" || passengerCount === 0) {
			setDatePickerValidation(false);
		} else {
			setDatePickerValidation(true);
			setShowSchedule(true);
			updateBusSchedule();
			setSearchParams({ ...searchParams, bus_id: busId, origin: terminalOrigin, destination: terminalDestination, bus_detail: true, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount });
		}
	}

	const selectScheduleAction = (departureTime, data = {}) => {
		setSelectedSchedule(departureTime);
		setScheduleData(data);
		setSearchParams({ ...searchParams, bus_id: busId, origin: terminalOrigin, destination: terminalDestination, bus_detail: true, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount, selected_schedule: departureTime });
	}

	const unselectRoute = () => {
		if (searchParams.get('selected_schedule') !== null) {
			setSelectedSchedule(null);
			setScheduleData({});
			setSearchParams({ ...searchParams, bus_id: busId, origin: terminalOrigin, destination: terminalDestination, bus_detail: true, choose_schedule: true, departure_date: departureDate, passenger_count: passengerCount });
		} else if (searchParams.get('choose_schedule') !== null) {
			setChooseSchedule(false);
			setSearchParams({ ...searchParams, bus_id: busId, origin: terminalOrigin, destination: terminalDestination, bus_detail: true });
		} else {
			setBusId(null);
			updateBusData(null);
			setIsSchedule(false);
			setSearchParams({});
		}
	}

	const updateBusData = (busId) => {
		if (busId && terminalOrigin && terminalDestination) {
			getBusDetail(busId, terminalOrigin, terminalDestination);
		}
	}

	const updateBusSchedule = () => {
		if (busId && terminalOrigin && terminalDestination && passengerCount) {
			console.log("MASUK")
			getBusSchedule(busId, terminalOrigin, terminalDestination, passengerCount);
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

	// Backend Integration
	const timeConvert = (minute) => {
		return `${('0' + Math.floor(minute / 60)).slice(-2)}:${('0' + Math.round(minute - Math.floor(minute / 60) * 60)).slice(-2)}`;
	}
		
	const getTerminalData = () => {
		axios.get(
			`http://localhost:8000/books/stopovers/${terminalDestination ? terminalDestination : ''}`
		).then(response => {
			setTerminalOriginData(response.data);
		})
		axios.get(
			`http://localhost:8000/books/stopovers/${terminalOrigin ? terminalOrigin : ''}`
			).then(response => {
				setTerminalDestinationData(response.data);
			})
	}
	
	const getBusesData = () => {
		axios.get(
			`http://localhost:8000/books/buses/`, {
				params: {
					origin: terminalOrigin,
					destination: terminalDestination,
				}
			}
			).then(response => {
				const map = new Map();
				response.data.forEach((datum) => {
					const key = datum.agencyId;
					if (map.get(key)) {
						map.get(key).push(datum);
					} else {
						map.set(key, [datum]);
					}
				})	

				setBusesData(map)
			}
		);
	}
	
	const getBusDetail = (id, origin, destination) => {
		axios.get(
			`http://localhost:8000/books/buses/${id}`, {
				params: {
					origin,
					destination,
				}
			}
		).then(response => {
				console.log(response.data);
				setBusData(response.data);
			}
		);
	}
	
	const getBusSchedule = (id, origin, destination, numOfPeople) => {
		axios.get(
			`http://localhost:8000/books/buses/schedule/${id}`, {
				params: {
					origin,
					destination,
					numOfPeople
				}
			}
		).then(response => {
				setBusSchedule(response.data);
			}
		);
	}
	
	const getTotalPrice = (id, origin, destination, departureTime, numOfPeople) => {
		axios.get(
			`http://localhost:8000/books/buses/availableseat/${id}`, {
				params: {
					origin,
					destination,
					departureTime,
					numOfPeople
				}
			}
		).then(response => {
				setTotalPrice(response.data.totalPrice);
			}
		);
	}

	const rupiah = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
	})
	
	// Page 1
	useEffect(() => {
		getTerminalData();
		
		if (terminalOrigin && terminalDestination) {
			getBusesData();
		}

		if (isSchedule && busId && terminalOrigin && terminalDestination) {
			getBusDetail(busId, terminalOrigin, terminalDestination);
		}

		if (showSchedule && busId && terminalOrigin && terminalDestination && passengerCount) {
			getBusSchedule(busId, terminalOrigin, terminalDestination, passengerCount);
		}

		if (showSchedule && busId && terminalOrigin && terminalDestination && selectedSchedule && passengerCount) {
			getTotalPrice(busId, terminalOrigin, terminalDestination, selectedSchedule, passengerCount);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [terminalOrigin, terminalDestination])

	useEffect(() => {
		if (searchParams.get('bus_id') === null) {
			setBusId(null);
			updateBusData(null);
			return;
		}
		setBusId(searchParams.get('bus_id'));
		updateBusData(searchParams.get('bus_id'));
		
		if (searchParams.get('origin') === null || searchParams.get('destination') === null) {
			setTerminalOrigin(null);
			setTerminalDestination(null);
			return;
		}
		setTerminalOrigin(searchParams.get('origin'));
		setTerminalDestination(searchParams.get('destination'));

		if (searchParams.get('bus_detail') === null) {
			setIsSchedule(false);
			return;
		}
		setIsSchedule(true);
		
		if (searchParams.get('choose_schedule') === null) {
			setChooseSchedule(false);
			return;
		}
		setChooseSchedule(true);
		
		if (searchParams.get('departure_date') === null || searchParams.get('passenger_count') === null) {
			setDepartureDate("");
			setPassengerCount(0);
			setShowSchedule(false);
			return;
		}
		setDepartureDate(searchParams.get('departure_date'));
		setPassengerCount(parseInt(searchParams.get('passenger_count')));
		setShowSchedule(true);

		if (searchParams.get('selected_schedule') === null) {
			setSelectedSchedule(-1);
			setScheduleData({});
			return;
		} 
		const selectedScheduleId = searchParams.get('selected_schedule');
		setSelectedSchedule(selectedScheduleId);
		setScheduleData(findScheduleById(selectedScheduleId));
	}, [searchParams])

	return (
		<>
			{
				!isPersonalData && (
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
													data={terminalOriginData} 
													selectedData={terminalOrigin} 
													setSelectedData={setTerminalOrigin} 
													defaultMessage={'Pilih Terminal Keberangkatan'} 
												/>
												<hr />
												<DropDownSmall 
													data={terminalDestinationData} 
													selectedData={terminalDestination} 
													setSelectedData={setTerminalDestination} 
													defaultMessage={'Pilih Terminal Tujuan'} 
												/>
											</div>
											<img src={ChangeRouteIconImage} onClick={reverseTerminal} className="terminal-change-icon cursor-pointer" alt="Change Route Icon" />
										</div>
										{ busesData !== null && (
											<div className="route-data">
												{[...busesData.keys()]?.map((agency, idx) => (
													<div key={idx} className="route-item">
														<div className="route-name">
															<p className="text3">{agency}</p>
														</div>
														{busesData.get(agency)?.map((bus, idx) => (
															<div key={idx} className={`route-detail ${busId === bus.id ? 'highlighted' : ''}`}>
																<div className="route-source cursor-pointer" onClick={() => updateBusId(bus.id)}>
																	<div className="route-source-terminal">
																		<div className="route-source-terminal-name">
																			<img src={BusIconImage} className="route-bus-icon" alt="Bus Icon" />
																			<p className="text3">{bus.name}</p>
																		</div>
																		<p className="text3">{bus.origin} - {bus.destination}</p>
																	</div>
																	<p className="text3">Berangkat pada {timeConvert(bus.departureTime)} dari {terminalOrigin}</p>
																</div>
																<img src={ArrowRightIconImage} className="route-arrow-icon cursor-pointer" onClick={() => updateShowBusDetail(bus.id)} alt="Arrow Right Icon" />
															</div>
														))}
													</div>
												))}
											</div>
										)}
									</div>
								)
							}
							
							{
								isSchedule && busData !== null && (
									<div className="route-detail-bus-trip">
										<div className="route-detail-container">
											<div className="route-detail-info">
												<img src={ArrowLeftIconImage} className="route-arrow-icon cursor-pointer" alt="Arrow Right Icon" onClick={unselectRoute} />
												<div className="route-source">
													<div className="route-source-terminal">
														<div className="route-source-terminal-name dark">
															<img src={BusWhiteIconImage} className="route-bus-icon" alt="Bus Icon" />
															<p className="text3">{busData.name}</p>
														</div>
														<p className="text3">{busData.origin} - {busData.destination}</p>
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
													<BusLine routeData={busData.routes} />
													<div className="trip-info">
														<div className="trip-time">
															<div className="title">
																<p className="text3">Estimasi Perjalanan</p>
															</div>
															<p className="trip-time-detail text3">{busData.duration}</p>
														</div>
														<div className="trip-near-schedule">
															<div className="title">
																<p className="text3">Jadwal Terdekat</p>
															</div>
															<div className="trip-near-schedule-item">
																{
																	busData.scheduleTimes?.map((time, idx) => (
																		idx < 3 && (
																			<p key={idx} className="text3">{time}</p>
																		)
																	))
																}
															</div>
														</div>
														<div className="trip-price">
															<p className="trip-price-title text3">Harga</p>
															<p className="trip-price-item">{rupiah.format(busData.minPrice).slice(0, -3)} - {rupiah.format(busData.maxPrice).slice(0, -3)}</p>
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
																<p className="text3">{busData.routes[0].name}</p>
																<p className="text3">{busData.routes[busData.routes.length - 1].name}</p>
															</div>
														</div>
														<div className="schedule-item">
															<p className="text3">Tanggal Keberangkatan</p>
															<div className="schedule-item-detail">
																<p className="text3">{departureDate}</p>
																<p className="text3"><span className="font-bold">{scheduleData.departureTime}</span> - {scheduleData.arrivalTime}</p>
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
														<button disabled={!isCanBuy} onClick={() => setIsPersonalData(true)}>ISI DATA DIRI</button>
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
													showSchedule && busSchedule !== null ? (
														busSchedule.schedules.length > 0 ? (
															busSchedule.schedules?.map((schedule, idx) => (
																<ChooseSchedule key={idx} busData={busSchedule} scheduleIdx={idx} passengerCount={passengerCount} selectScheduleAction={selectScheduleAction} />
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
											selectedSeats={selectedSeats}
											setSelectedSeats={setSelectedSeats}
											seatAvailable={scheduleData.seat_available} 
											passengerCount={passengerCount} 
											setIsCanBuy={setIsCanBuy}
										/>
									</div>
								)
							}
						</div>
					</main>
				)
			}
			{
				isPersonalData && (
					<PersonalDataPayment  
						busData={busData} 
						departureDate={departureDate} 
						scheduleData={scheduleData} 
						passengerCount={passengerCount} 
						selectedSeats={selectedSeats}
					/>
				)
			}
		</>
	);
}

export default Rute;
