import React from "react";
import "../styles/bantuan.css";

function Bantuan() {
	return (
		<>
			<div className="bantuan-page">
				<div className="right-side">
					<div className="contact-us-text"> BANTUAN </div>
					<div className="saran-text text1">
						Sampaikan Keluhan Anda kepada Kami
					</div>
					<div className="saran-field">
						<input type="text" id="nama" name="nama" placeholder="Nama"></input>
						<input
							type="text"
							id="email"
							name="Nomor Telepon"
							placeholder="Nomor Telepon"
						></input>
						<input
							type="text"
							id="email"
							name="email"
							placeholder="Email"
						></input>
						<textarea
							type="text"
							id="saran"
							name="keluhan"
							placeholder="Keluhan"
							className="saran-input"
						></textarea>
						<button>Kirim</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Bantuan;
