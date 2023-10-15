import React from "react";
import "../styles/DataDiri.css"
import { Link } from "react-router-dom";

function DataDiri() {
	return (
		<main className="personal-data">
            <div className="personal-data-container">
                <div className="page-heading center">
                    <h3 className="page-heading-color1">Data Diri</h3>
                    <h3 className="page-heading-color2">Penumpang</h3>
                </div>
                <form>
                    <div className="input-item">
                        <label className="text3" htmlFor="name">Nama Pemesan</label>
                        <input type="text" id="name" name="name" placeholder="Nama" />
                    </div>
                    <div className="input-item">
                        <label className="text3" htmlFor="nik">NIK Pemesan</label>
                        <input type="text" id="nik" name="nik" placeholder="NIK" />
                    </div>
                    <div className="input-item">
                        <label className="text3" htmlFor="email">Email Pemesan</label>
                        <input type="email" id="email" name="email" placeholder="Email" />
                    </div>
                    <div className="passenger-list">
                        <div className="input-item">
                            <label className="text3" htmlFor="name1">Nama Penumpang 1</label>
                            <input type="text" id="name1" name="name1" placeholder="Nama" />
                        </div>
                        <div className="input-item">
                            <label className="text3" htmlFor="name2">Nama Penumpang 2</label>
                            <input type="text" id="name2" name="name2" placeholder="Nama" />
                        </div>
                    </div>
                    <div className="input-item">
                        <p className="text3">Total Pembayaran</p>
                        <p className="personal-data-total-price">Rp20.000</p>
                    </div>
                    <Link to="/bayar" className="link-none">
                        <button>BAYAR</button>
                    </Link>
                </form>
            </div>
        </main>
	);
}

export default DataDiri;
