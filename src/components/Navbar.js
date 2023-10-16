import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import NavbarMobile from "../assets/NavbarMobile.png";
import "../styles/Navbar.css";

function Navbar() {
	const location = useLocation();

	const [isAdminView, setIsAdminView] = useState(false);
	const [isLoginView, setIsLoginView] = useState(false);

	useEffect(() => {
		console.log('location', location)

		if (location.pathname === '/admin') {
			setIsLoginView(true);
			return
		} else {
			setIsLoginView(false);
		}

		if (location.pathname.split('/')[1] === 'admin') {
			setIsAdminView(true);
		} else {
			setIsAdminView(false);
		}

		const links = document.querySelectorAll(".right-navbar a");

		links.forEach((link) => {
			link.classList.remove("active");

			if (link.id.split('/')[1] === 'admin') {
				if (link.id.split('/')[2] === location.pathname.split('/')[2]) {
					link.classList.add("active");
				}  
			} else {
				if (link.id === location.pathname) link.classList.add("active");
			}

		});

	}, [location]);

	const toHomePage = () => {
		window.location.href = "/";
	};

	return (
		<>
			{
				!isLoginView && (
					<nav className="navbar">
						<div className="left-navbar">
							<img src={Logo} alt="logo" onClick={toHomePage} />
						</div>
						<div className="right-navbar">
							{
								
								!isAdminView ? (
									<>
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
									</>
								) : (
									<>
										<Link to="/admin/agensi" id="/admin/agensi">
											Agensi
										</Link>
										<Link to="/admin/bus" id="/admin/bus">
											Bus
										</Link>
										<button className="sign-out-btn">SIGN OUT</button>
									</>
								)
							}
						</div>
						<div className="right-navbar2">
							<img src={NavbarMobile} alt="logo" />
						</div>
					</nav>
				)
			}
		</>
	);
}

export default Navbar;
