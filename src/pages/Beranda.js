import React from "react";
import Footer from "../components/Footer";
import BusImage from "../assets/Home-Bus.png";
import LocationImage from "../assets/Location.png";
import SearchImage from "../assets/Search.png";
import "../styles/Beranda.css";

function Beranda() {
	return (
		<>
			<div className="explore-section">
				<div className="left-side-explore">
					<div>
						<h1 className="explore-heading-color1">EXPLORE THE</h1>
						<h1 className="explore-heading-color2">ADVENTOROUS LIFE</h1>
					</div>
					<div className="explore-description text2">
						Temukan lokasi tujuanmu dan kami akan membantu merekomendasikan rute
						terbaik untukmu
					</div>
					<div className="explore-search-container">
						<div className="explore-search-input">
							<img src={LocationImage} alt="Location" height="24px" />
							<input
								type="text"
								id="location"
								name="location"
								placeholder="Mau Kemana?"
							></input>
						</div>
						<img
							src={SearchImage}
							alt="Search"
							className="explore-search-button"
						/>
					</div>
				</div>
				<div className="right-side-explore">
					<img src={BusImage} alt="Bus" height="285px" />
				</div>
			</div>
			<h3>menu</h3>
			<h3>fitur</h3>
			<h3>stay update </h3>
			<Footer />
		</>
	);
}

export default Beranda;
