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

	const toHomePage = () => {
		window.location.href = "/";
	};

	return (
		<>
			<nav className="navbar">
				<div className="left-navbar">
					<img src={Logo} alt="logo" onClick={toHomePage} />
				</div>
				<div className="right-navbar">
					<Link to="/" id="/">
						Beranda
					</Link>
					<Link to="/bus" id="/bus">
						Bus
					</Link>
					<Link to="/rute" id="/rute">
						Rute
					</Link>
					<Link to="/live" id="/live">
						Live
					</Link>
					<Link to="/bantuan" id="/bantuan">
						Bantuan
					</Link>
				</div>
				<div className="right-navbar2">
					<img src={Logo} alt="logo" />
				</div>
			</nav>
		</>
	);
}

export default Navbar;
