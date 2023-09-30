import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BusImage from "../assets/Home-Bus.png";
import LocationImage from "../assets/Location.png";
import SearchImage from "../assets/Search.png";
import InfoBusImage from "../assets/InfoBus.png";
import RuteBusImage from "../assets/RuteBus.png";
import LiveBusImage from "../assets/LiveBus.png";
import BantuanBusImage from "../assets/BantuanBus.png";
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
			<div className="menu-section">
				<h2>Menu</h2>
				<div className="menu-feature-container">
					<Link to="/bus" className="card-container">
						<img src={InfoBusImage} alt="Info Bus" height="100px" />
						<div className="text1">Info Bus</div>
					</Link>
					<Link to="/rute" className="card-container">
						<img src={RuteBusImage} alt="Info Bus" height="100px" />
						<div className="text1">Rute</div>
					</Link>
					<Link to="/live" className="card-container">
						<img src={LiveBusImage} alt="Info Bus" height="100px" />
						<div className="text1">Live Bus</div>
					</Link>
					<Link to="/bantuan" className="card-container">
						<img src={BantuanBusImage} alt="Info Bus" height="100px" />
						<div className="text1">Bantuan</div>
					</Link>
				</div>
			</div>
			<h3>fitur</h3>
			<h3>stay update </h3>
			<Footer />
		</>
	);
}

export default Beranda;
