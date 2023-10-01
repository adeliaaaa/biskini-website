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
import UpdateBusImage from "../assets/UpdateBus.png";
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
						<img src={InfoBusImage} alt="Info Bus" height="96px" />
						<div className="text1">Info Bus</div>
					</Link>
					<Link to="/rute" className="card-container">
						<img src={RuteBusImage} alt="Rute Bus" height="96px" />
						<div className="text1">Rute</div>
					</Link>
					<Link to="/live" className="card-container">
						<img src={LiveBusImage} alt="Live Bus" height="96px" />
						<div className="text1">Live Bus</div>
					</Link>
					<Link to="/bantuan" className="card-container">
						<img src={BantuanBusImage} alt="Bantuan" height="96px" />
						<div className="text1">Bantuan</div>
					</Link>
				</div>
			</div>
			<div className="fitur-section">
				<div className="fitur-description">
					<div className="fitur-description1">BARU DI BISKINI?</div>
					<h2>
						KENALI <span>FITUR</span> YANG TERSEDIA
					</h2>
					<div className="text1">
						Temukan lokasi tujuanmu dan kami akan membantu merekomendasikan rute
						terbaik untukmu
					</div>
				</div>
				<div className="fitur-container">
					<div className="card-container">
						<div className="description">
							<img src={InfoBusImage} alt="Info Bus" height="64px" />
							<h3>Info Bus</h3>
							<div className="text3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</div>
						</div>
						<Link to="/bus">Lihat detail -{">"} </Link>
					</div>
					<div className="card-container">
						<div className="description">
							<img src={RuteBusImage} alt="Rute Bus" height="64px" />
							<h3>Rute Bus</h3>
							<div className="text3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</div>
						</div>
						<Link to="/rute">Lihat detail -{">"} </Link>
					</div>
					<div className="card-container">
						<div className="description">
							<img src={LiveBusImage} alt="Live Bus" height="64px" />
							<h3>Live Bus</h3>
							<div className="text3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</div>
						</div>
						<Link to="/live">Lihat detail -{">"} </Link>
					</div>
					<div className="card-container">
						<div className="description">
							<img src={BantuanBusImage} alt="Bantuan Bus" height="64px" />
							<h3>Bantuan Bus</h3>
							<div className="text3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</div>
						</div>
						<Link to="/bantuan">Lihat detail -{">"} </Link>
					</div>
				</div>
			</div>
			<div className="update-section">
				<div className="update-title">
					<div className="update-title-1">STAY UPDATED</div>
					<h2>
						<span>JELAJAHI</span> BERITA TERKINI
					</h2>
					<div className="text1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua
					</div>
				</div>
				<div className="update-content">
					<div className="recomendation-frame">
						<div className="update-card-container">
							<img src={UpdateBusImage} alt="Update Bus" />
							<div className="update-card-description">
								<h5>Penggabungan BUMN Transportasi Jalan</h5>
								<div className="text3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit
								</div>
							</div>
							<Link to="https://jadwalbis.com/" target="_blank">
								Lihat detail -{">"}{" "}
							</Link>
						</div>
						<div className="update-card-container">
							<img src={UpdateBusImage} alt="Update Bus" />
							<div className="update-card-description">
								<h5>Penggabungan BUMN Transportasi Jalan</h5>
								<div className="text3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit
								</div>
							</div>
							<Link to="https://jadwalbis.com/" target="_blank">
								Lihat detail -{">"}{" "}
							</Link>
						</div>
						<div className="update-card-container">
							<img src={UpdateBusImage} alt="Update Bus" />
							<div className="update-card-description">
								<h5>Penggabungan BUMN Transportasi Jalan</h5>
								<div className="text3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit
								</div>
							</div>
							<Link to="https://jadwalbis.com/" target="_blank">
								Lihat detail -{">"}{" "}
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Beranda;
