import React from "react";

import "../../styles/Rute.css";

function ChooseSeat({ selectedSeats, setSelectedSeats, seatAvailable, passengerCount, setIsCanBuy }) {

    // const [selectedSeats, setSelectedSeats] = useState([]);

    const seatClass = (seat) => {
        if (selectedSeats.includes(seat)) {
            return 'seat chosen'
        } else if (seatAvailable?.includes(seat)) {
            return 'seat empty'
        } else {
            return 'seat'
        }
    }

    const updateSelectedSeats = (seatId) => {
        if (!seatAvailable?.includes(seatId)) return
        
        let selectedSeatCount = selectedSeats.length

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId))
            selectedSeatCount--;
        } else {
            if (selectedSeats.length === passengerCount) return
            setSelectedSeats([...selectedSeats, seatId])
            selectedSeatCount++;
        }

        setIsCanBuy(selectedSeatCount === passengerCount)
    }

    return (
        <div className="seats">
            <div className="seats-row">
                <div className="seats-col">
                    <p className="seat driver text2">CO-DRIVER</p>
                </div>
                <div className="seats-col">
                    <p className="seat driver text2">DRIVER</p>
                </div>
            </div>
            {[...Array(8)].map((_, idx) => (
                <div key={idx} className="seats-row">
                    <div className="seats-col">
                        <p 
                            className={seatClass((idx * 4 ) + 1) + ' text2'}
                            onClick={() => updateSelectedSeats((idx * 4 ) + 1)}
                        >
                            {(idx * 4 ) + 1}
                        </p>
                        <p 
                            className={seatClass((idx * 4 ) + 2) + ' text2'}
                            onClick={() => updateSelectedSeats((idx * 4 ) + 2)}
                        >
                            {(idx * 4 ) + 2}
                        </p>
                    </div>
                    <div className="seats-col">
                        <p 
                            className={seatClass((idx * 4 ) + 3) + ' text2'}
                            onClick={() => updateSelectedSeats((idx * 4 ) + 3)}
                        >
                            {(idx * 4 ) + 3}
                        </p>
                        <p 
                            className={seatClass((idx * 4 ) + 4) + ' text2'}
                            onClick={() => updateSelectedSeats((idx * 4 ) + 4)}
                        >
                            {(idx * 4 ) + 4}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChooseSeat;