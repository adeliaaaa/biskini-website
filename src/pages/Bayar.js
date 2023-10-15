import React from "react";
import "../styles/Bayar.css"
import { Link } from "react-router-dom";
import SuccessPaymentIconImage from "../assets/SuccessPaymentIcon.png"
import { useState } from "react";
function Bayar() {

    const [isPaid, setIsPaid] = useState(false);

	return (
		<main className="confirm-payment">
            <div className="confirm-payment-container">
                {
                    !isPaid ? (
                        <>
                            <div className="page-heading center">
                                <h3 className="page-heading-color1">Konfirmasi</h3>
                                <h3 className="page-heading-color2">Pembayaran</h3>
                            </div>
                            <div className="schedule">
                                <div className="schedule-item">
                                    <p className="text3">Tujuan Keberangkatan</p>
                                    <div className="schedule-item-detail">
                                        <p className="text3">Halte Metro</p>
                                        <p className="text3">Pasar Caringin</p>
                                    </div>
                                </div>
                                <div className="schedule-item">
                                    <p className="text3">Tanggal Keberangkatan</p>
                                    <div className="schedule-item-detail">
                                        <p className="text3">30 September</p>
                                        <p className="text3"><span className="font-bold">13.15</span> - 13.48</p>
                                    </div>
                                </div>
                                <div className="schedule-item">
                                    <p className="text3">Jumlah Penumpang</p>
                                    <div className="schedule-item-detail">
                                        <p className="text3">2 Orang</p>
                                    </div>
                                </div>
                                <div className="schedule-item">
                                    <p className="text3">Kursi</p>
                                    <div className="schedule-item-detail">
                                        <p className="text3">10, 35</p>
                                    </div>
                                </div>
                                <div className="schedule-item">
                                    <p className="text3">Harga</p>
                                    <p className="text1 schedule-item-price">Rp20.000</p>
                                </div>
                                <button onClick={() => setIsPaid(true)}>SELESAIKAN PEMBAYARAN</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <img src={SuccessPaymentIconImage} alt="Success Payment Icon" className="success-payment-icon" />
                            <div className="page-heading center">
                                <h3 className="page-heading-color1">Pembayaran</h3>
                                <h3 className="page-heading-color2">Berhasil</h3>
                            </div>
                            <Link to="/" className="link-none">
                                <button>UNDUH TIKET</button>
                            </Link>
                        </>
                    )
                }
            </div>
        </main>
	);
}

export default Bayar;
