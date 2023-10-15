import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArrowRightIconImage from "../assets/ArrowRightIcon.png";
import BusIconImage from "../assets/BusIcon.png";
import terminalData from "../data/terminal.json"
import routeData from "../data/route.json"
import DropDownSmall from "../components/route/DropDownSmall";
import Maps from "../components/route/Maps";

function Live() {

	const [searchParams, setSearchParams] = useSearchParams();

	const [terminalOrigin, setTerminalOrigin] = useState(null);

	const [busId, setBusId] = useState(null);

	const [busData, setBusData] = useState({});

	const updateBusId = (id) => {
		setBusId(id);
		updateBusData(id);
		// setIsSchedule(true);
		setSearchParams({ ...searchParams, bus_id: id });
	}

	const updateShowBusDetail = (id) => {
		setBusId(id);
		updateBusData(id);
		setSearchParams({ ...searchParams, bus_id: id, bus_detail: true });
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

	useEffect(() => {
		if (searchParams.get('bus_id') !== null) {
			setBusId(searchParams.get('bus_id'));
			updateBusData(searchParams.get('bus_id'));

		} else {
			setBusId(null);
			updateBusData(null);
		}

	}, [searchParams])

	return (
		<>
			<main>
				<div className="route reverse">
					<div className="route-info">
						<div className="page-heading">
							<h3 className="page-heading-color1">Live</h3>
							<h3 className="page-heading-color2">Bis</h3>
						</div>
						<div className="terminal-change">
							<div className="terminal-change-source">
								<DropDownSmall
									data={terminalData.terminal_data} 
									selectedData={terminalOrigin} 
									setSelectedData={setTerminalOrigin} 
									defaultMessage={'Pilih Terminal Keberangkatan'} 
								/>
							</div>
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
				</div>
				<div className="second-container reverse">
					<Maps routeData={busData.route  ? busData.route : routeData.terminal_data[0].bus_data[0].route} />
				</div>
			</main>
		</>
	);
}

export default Live;
