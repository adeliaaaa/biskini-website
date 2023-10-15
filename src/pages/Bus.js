import React, { useState, useRef } from "react";
import DropDownButton from "../assets/InfoBusDropDown.png";
import SearchButton from "../assets/InfoBusSearch.png";
import InfoBusSelectAgent from "../assets/InfoBusSelect.png";
import Footer from "../components/Footer";
import "../styles/Bus.css";

function Bus() {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const catMenu = useRef(null);
	const [selectedAgensi, setSelectedAgensi] = useState("Pilih Agensi Bus");

	const closeOpenMenus = (e) => {
		if (
			catMenu.current &&
			isDropDownOpen &&
			!catMenu.current.contains(e.target)
		) {
			setIsDropDownOpen(false);
		}
	};

	document.addEventListener("mousedown", closeOpenMenus);

	const dropdownClicked = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

	const handleSelectAgen = (e) => {
		setSelectedAgensi(e.target.innerHTML);
		setIsDropDownOpen(false);
	};

	return (
		<>
			<div className="title-section">
				<h1>
					Informasi <span>Bus</span>
				</h1>
				<div className="text1">Temukan informasi bus favoritmu</div>
				<div className="title-dropdown">
					<div className="dropdown-container text2" ref={catMenu}>
						<div className="dropdown-text" onClick={dropdownClicked}>
							<span>{selectedAgensi}</span>
							<img src={DropDownButton} alt="dropdown" height={24} />
						</div>
						{isDropDownOpen && (
							<ul className="dropdown-lists">
								<li className="dropdown-list" onClick={handleSelectAgen}>
									Agensi 1
								</li>
								<li className="dropdown-list" onClick={handleSelectAgen}>
									Agensi 2
								</li>
								<li className="dropdown-list" onClick={handleSelectAgen}>
									Agensi 3
								</li>
								<li className="dropdown-list" onClick={handleSelectAgen}>
									Agensi 4
								</li>
								<li className="dropdown-list" onClick={handleSelectAgen}>
									Agensi 5
								</li>
							</ul>
						)}
					</div>
					<div className="dropdown-search">
						<button className="dropdown-search-button">
							Cari
							<img
								src={SearchButton}
								alt="search"
								height={24}
								class="hide-in-mobile"
							/>
						</button>
					</div>
				</div>
			</div>
			<div className="info-section">
				<img src={InfoBusSelectAgent} alt="select agent" />
				<div className="info-desc">
					<h3>Pilih Agensi Bus Dahulu Ya</h3>
					<div className="text1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Bus;
