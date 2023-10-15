import React from "react";

import "../../styles/Rute.css";
import BulletFilledIconImage from "../../assets/BulletFilledIcon.png";
import BulletIconImage from "../../assets/BulletIcon.png";

function BusLine({routeData, chooseSchedule}) {
    return (
        <div className={`bus-line ${!chooseSchedule ? 'scroll' : ''}`}>
            {routeData?.map((route, idx) => (
                <div key={idx} className="bus-line-item">
                    <img 
                        src={
                            (idx === 0 || idx === routeData.length - 1) 
                                ? BulletFilledIconImage 
                                : BulletIconImage
                        } 
                        className="bullet-icon" 
                        alt="Bullet Icon" 
                    />
                    <p className="text3">{route.name}</p>
                </div>
            ))}
        </div>
    )
}

export default BusLine;