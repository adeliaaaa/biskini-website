import React from "react";
import BusWhiteIconImage from "../../assets/BusWhiteIcon.png";

function ChooseSchedule({selectScheduleAction}) {
    return (
        <div className="choose-schedule-item">
            <div className="choose-schedule-date-price">
                <p><span className="font-bold">13.15</span> - 13.48</p>
                <p className="font-bold">Rp10.000</p>
            </div>
            <div className="route-source">
                <div className="route-source-terminal">
                    <div className="route-source-terminal-name dark">
                        <img src={BusWhiteIconImage} className="route-bus-icon" alt="Bus Icon" />
                        <p>TMB K1</p>
                    </div>
                    <p>Cibiru - Cibereum</p>
                </div>
                <p><span className="font-bold">Halte Metro</span> - Pasar Caringin</p>
            </div>
            <div className="select-seat">
                <p>Tersedia 6 Kursi</p>
                <button className="sm-btn" onClick={() => selectScheduleAction(0)}>PILIH KURSI</button>
            </div>
        </div>
    )
}

export default ChooseSchedule;