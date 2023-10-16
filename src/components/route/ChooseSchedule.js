import React, { useEffect, useState } from "react";
import BusWhiteIconImage from "../../assets/BusWhiteIcon.png";

function ChooseSchedule({ busData, scheduleIdx, passengerCount, selectScheduleAction }) {

    const [scheduleData, setScheduleData] = useState(null);

    const rupiah = Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })

    useEffect(() => {
        setScheduleData(busData.schedules[scheduleIdx]);
    }, [busData, scheduleIdx])

    return (
        <div className="choose-schedule-item">
            <div className="choose-schedule-date-price">
                <p><span className="font-bold text1">{scheduleData?.departureTime}</span> - {scheduleData?.arrivalTime}</p>
                <p className="font-bold text1">{rupiah.format(scheduleData?.price).slice(0, -3)}</p>
            </div>
            <div className="route-source">
                <div className="route-source-terminal">
                    <div className="route-source-terminal-name dark">
                        <img src={BusWhiteIconImage} className="route-bus-icon" alt="Bus Icon" />
                        <p className="text3">{busData.name}</p>
                    </div>
                    <p className="text3">{busData.origin} - {busData.destination}</p>
                </div>
                <p className="text2"><span className="font-bold">{busData.routes[0]?.name}</span> - {busData.routes[busData.routes.length - 1]?.name}</p>
            </div>
            <div className="select-seat">
                <p className={passengerCount > scheduleData?.seatAvailable.length ? 'unavailable text2' : 'text2'}>Tersedia {scheduleData?.seatAvailable.length} Kursi</p>
                <button disabled={passengerCount > scheduleData?.seatAvailable.length} className="sm-btn" onClick={() => selectScheduleAction(scheduleData?.departureTime, scheduleData)}>PILIH KURSI</button>
            </div>
        </div>
    )
}

export default ChooseSchedule;