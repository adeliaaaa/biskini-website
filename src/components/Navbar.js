import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import "../styles/Navbar.css";

function Navbar() {
	const location = useLocation();

	useEffect(() => {
		const links = document.querySelectorAll(".right-navbar a");
		links.forEach((link) => {
			link.classList.remove("active");
			if (link.id === location.pathname) link.classList.add("active");
		});
	}, [location]);

	return (
		<>
			<nav className="navbar">
				<div className="left-navbar">
					<img src={Logo} alt="logo" border="0" width="64px" height="64px" />
				</div>
				<div className="right-navbar">
					<Link to="/" id="/">
						Beranda
					</Link>
					<Link to="/beli" id="/beli">
						Beli
					</Link>
					<Link to="/bus" id="/bus">
						Bus
					</Link>
					<Link to="/rute" id="/rute">
						Rute
					</Link>
					<Link to="/jadwal" id="/jadwal">
						Jadwal
					</Link>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
