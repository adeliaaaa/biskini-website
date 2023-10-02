import React from "react";

import "../../styles/Rute.css";
import BulletFilledIconImage from "../../assets/BulletFilledIcon.png";
import BulletIconImage from "../../assets/BulletIcon.png";

function BusLine() {
    return (
        <div className="bus-line">
            <div className="bus-line-item">
                <img src={BulletFilledIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
            <div className="bus-line-item">
                <img src={BulletIconImage} className="bullet-icon" alt="Bullet Icon" />
                <p>Halte Metro</p>
            </div>
        </div>
    )
}

export default BusLine;