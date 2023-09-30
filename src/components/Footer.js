import React from "react";
import "../styles/Footer.css";

function Footer() {
	return (
		<>
			<footer>
				<div className="left-side">
					<div className="contact-us-text"> CONTACT US</div>
					<div className="info">
						<div className="text2">Phone (022) 123 456</div>
						<div className="text2">Fax (022) 123 456</div>
						<br></br>
						<div className="text2">Jalan Ganesa No. 202</div>
						<div className="text2">Kota Bandung, Jawa Barat</div>
						<br></br>
						<div className="text2">contactus@biskini.com</div>
					</div>
				</div>
				<div className="right-side">
					<div className="contact-us-text"> SARAN </div>
					<div className="saran-text text1">
						Saran dan masukan Anda untuk perbaikan kami
					</div>
					<div className="saran-field">
						<input type="text" id="nama" name="nama" placeholder="Nama"></input>
						<input
							type="text"
							id="email"
							name="email"
							placeholder="Email"
						></input>
						<textarea
							type="text"
							id="saran"
							name="saran"
							placeholder="Saran dan Masukan"
							className="saran-input"
						></textarea>
						<button>Kirim</button>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
