import React, { useState } from "react";
import DropDownButton from "../assets/InfoBusDropDown.png";
import SearchButton from "../assets/InfoBusSearch.png";
import "../styles/Bus.css";

function Bus() {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const dropdownClicked = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

	return (
		<>
			<div className="title-section">
				<h1>
					Informasi <span>Bus</span>
				</h1>
				<div className="text1">Temukan informasi bus favoritmu</div>
				<div className="title-dropdown">
					<div className="dropdown-container text2">
						<div className="dropdown-text" onClick={dropdownClicked}>
							<span>Pilih Agensi Bus</span>
							<img src={DropDownButton} alt="dropdown" height={24} />
						</div>
						{isDropDownOpen && (
							<ul className="dropdown-lists">
								<li className="dropdown-list">Agensi 1</li>
								<li className="dropdown-list">Agensi 2</li>
								<li className="dropdown-list">Agensi 3</li>
								<li className="dropdown-list">Agensi 4</li>
								<li className="dropdown-list">Agensi 5</li>
							</ul>
						)}
					</div>
					<div className="dropdown-search">
						<button className="dropdown-search-button">
							Cari
							<img src={SearchButton} alt="search" height={24} />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Bus;
