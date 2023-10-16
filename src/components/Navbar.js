import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import NavbarMobile from "../assets/NavbarMobile.png";
import "../styles/Navbar.css";

function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();

	const [expandNav, setExpandNav] = useState(false);

	const [isAdminView, setIsAdminView] = useState(false);
	const [isLoginView, setIsLoginView] = useState(false);

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/admin");
	};

	useEffect(() => {
		setExpandNav(false);
		if (location.pathname === "/admin") {
			setIsLoginView(true);
			return;
		} else {
			setIsLoginView(false);
		}

		if (location.pathname.split("/")[1] === "admin") {
			setIsAdminView(true);
		} else {
			setIsAdminView(false);
		}

		const links = document.querySelectorAll(".right-navbar a");

		links.forEach((link) => {
			link.classList.remove("active");

			if (link.id.split("/")[1] === "admin") {
				if (link.id.split("/")[2] === location.pathname.split("/")[2]) {
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

	const navbarMovileHandler = () => {
		setExpandNav(!expandNav);
	};

	return (
		<>
			<nav className={`navbar ${isLoginView ? "none" : ""}`}>
				<div className="left-navbar">
					<img src={Logo} alt="logo" onClick={toHomePage} />
				</div>
				<div className={`right-navbar ${isAdminView ? "none" : ""}`}>
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
				<div className={`right-navbar ${!isAdminView ? "none" : ""}`}>
					<Link to="/admin/agensi" id="/admin/agensi">
						Agensi
					</Link>
					<Link to="/admin/bus" id="/admin/bus">
						Bus
					</Link>
					<button className="sign-out-btn" onClick={logout}>
						SIGN OUT
					</button>
				</div>
				<div className="right-navbar2">
					<img src={NavbarMobile} alt="logo" onClick={navbarMovileHandler} />
					{!isAdminView && expandNav && (
						<div className="expandable-nav">
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
					)}
					{isAdminView && expandNav && (
						<div className="expandable-nav">
							<Link to="/admin/agensi" id="/admin/agensi">
								Agensi
							</Link>
							<Link to="/admin/bus" id="/admin/bus">
								Bus
							</Link>
							<button className="sign-out-btn" onClick={logout}>
								SIGN OUT
							</button>
						</div>
					)}
				</div>
			</nav>
		</>
	);
}

export default Navbar;
