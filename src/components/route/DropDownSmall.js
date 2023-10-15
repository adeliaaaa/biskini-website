import React, { useState } from 'react'

import DropDownWhiteIconImage from "../../assets/DropDownWhiteIcon.png"
import "../../styles/DropDownSmall.css"

function DropDownSmall({data, selectedData, setSelectedData, defaultMessage}) {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const dropdownClicked = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

    const setDropDownValue = (val) => {
        setSelectedData(val)
        setIsDropDownOpen(false);
    }

    return (
        <div className="dropdown-sm-container text2">
            <div className="dropdown-sm-text" onClick={dropdownClicked}>
                <span className="text3">{selectedData ? selectedData : defaultMessage}</span>
                <img src={DropDownWhiteIconImage} alt="dropdown" height={10} />
            </div>
            {isDropDownOpen && (
                <ul className="dropdown-sm-lists">
                    {
                        data.map((terminal) => (
                            <li className="dropdown-sm-list text3" onClick={() => setDropDownValue(terminal)}>{terminal}</li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default DropDownSmall;
