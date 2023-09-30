import React from "react";
import "../styles/Footer.css";

function Footer() {
	return (
		<>
			<footer>
				<div className="left-side">
					<div className="contact-us-text"> CONTACT US</div>
					<div className="info">
						<p>
							Phone (022) 123 456 <br></br> Fax (022) 123 456
						</p>

						<p>
							Jalan Ganesa No. 202 <br></br>Kota Bandung, Jawa Barat
						</p>

						<p>contactus@biskini.com</p>
					</div>
				</div>
				<div className="right-side">
					<div className="contact-us-text"> SARAN </div>
					<div className="saran-text">
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
