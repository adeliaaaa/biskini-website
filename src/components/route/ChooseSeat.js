import React from "react";

import "../../styles/Rute.css";

function ChooseSeat() {
    return (
        <div className="seats">
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat driver">CO-DRIVER</p>
                </div>
                <div className="seats-col">
                    <p className="seat driver">DRIVER</p>
                </div>
            </div>
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat">1</p>
                    <p className="seat">2</p>
                </div>
                <div className="seats-col">
                    <p className="seat chosen">3</p>
                    <p className="seat">4</p>
                </div>
            </div>
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat empty">1</p>
                    <p className="seat">2</p>
                </div>
                <div className="seats-col">
                    <p className="seat">3</p>
                    <p className="seat">4</p>
                </div>
            </div>
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat">1</p>
                    <p className="seat">2</p>
                </div>
                <div className="seats-col">
                    <p className="seat">3</p>
                    <p className="seat">4</p>
                </div>
            </div>
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat">1</p>
                    <p className="seat">2</p>
                </div>
                <div className="seats-col">
                    <p className="seat">3</p>
                    <p className="seat">4</p>
                </div>
            </div>
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat">1</p>
                    <p className="seat">2</p>
                </div>
                <div className="seats-col">
                    <p className="seat">3</p>
                    <p className="seat">4</p>
                </div>
            </div>
        </div>
    )
}

export default ChooseSeat;