import React, { useEffect, useState } from "react";
import BusWhiteIconImage from "../../assets/BusWhiteIcon.png";

function ChooseSchedule({ busData, scheduleIdx, passengerCount, selectScheduleAction }) {

    const [scheduleData, setScheduleData] = useState(null);

    useEffect(() => {
        setScheduleData(busData.schedule[scheduleIdx]);
    }, [busData, scheduleIdx])

    return (
        <div className="choose-schedule-item">
            <div className="choose-schedule-date-price">
                <p><span className="font-bold">{scheduleData?.departure_time}</span> - {scheduleData?.arrival_time}</p>
                <p className="font-bold">{scheduleData?.price}</p>
            </div>
            <div className="route-source">
                <div className="route-source-terminal">
                    <div className="route-source-terminal-name dark">
                        <img src={BusWhiteIconImage} className="route-bus-icon" alt="Bus Icon" />
                        <p>{busData.bus_name}</p>
                    </div>
                    <p>{busData.terminal_origin} - {busData.terminal_destination}</p>
                </div>
                <p><span className="font-bold">{busData.route[0]?.name}</span> - {busData.route[busData.route.length - 1]?.name}</p>
            </div>
            <div className="select-seat">
                <p className={passengerCount > scheduleData?.seat_available.length ? 'unavailable' : ''}>Tersedia {scheduleData?.seat_available.length} Kursi</p>
                <button disabled={passengerCount > scheduleData?.seat_available.length} className="sm-btn" onClick={() => selectScheduleAction(scheduleData?.schedule_id, scheduleData)}>PILIH KURSI</button>
            </div>
        </div>
    )
}

export default ChooseSchedule;