import React from "react";

import "../../styles/Rute.css";
import BulletFilledIconImage from "../../assets/BulletFilledIcon.png";
import BulletIconImage from "../../assets/BulletIcon.png";

function BusLine({routeData}) {
    return (
        <div className="bus-line">
            {routeData?.map((route, idx) => (
                <div className="bus-line-item">
                    <img 
                        src={
                            (idx === 0 || idx === routeData.length - 1) 
                                ? BulletFilledIconImage 
                                : BulletIconImage
                        } 
                        className="bullet-icon" 
                        alt="Bullet Icon" 
                    />
                    <p>{route.name}</p>
                </div>
            ))}
        </div>
    )
}

export default BusLine;