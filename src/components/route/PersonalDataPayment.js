import React, { useEffect, useState } from "react";
import "../../styles/PersonalDataPayment.css"
import SuccessPaymentIconImage from "../../assets/SuccessPaymentIcon.png"

function PersonalDataPayment({passengerCount, busData, scheduleData, departureDate, selectedSeats}) {

    const [isPayment, setIsPayment] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const [personalData, setPersonalData] = useState({
        name: '',
        nik: '',
        email: '',
        passengers: []
    })

    const [errorMessages, setErrorMessages] = useState({
        name: '',
        nik: '',
        email: '',
        passengers: []
    })

    const handleIsPayment = (e) => {

        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const message = {...errorMessages};
        const isEmailValid = emailRegex.test(personalData.email);

        message.name = personalData.name === '' ? 'Nama tidak boleh kosong' : '';
        message.nik = personalData.nik === '' ? 'NIK tidak boleh kosong' : '';
        message.email = !isEmailValid ? 'Email tidak valid' : '';
        message.passengers = personalData.passengers.map((passenger, index) => passenger === '' ? `Nama penumpang ${index + 1} tidak boleh kosong` : '');


        setErrorMessages(message);

        if (
            message.name === '' &&
            message.nik === '' &&
            message.email === '' &&
            message.passengers.every(message => message === '')
        ) {
            console.log('masuk siniii')
            setIsPayment(true);
        }
        // setIsPayment(true);
        
    }

    useEffect(() => {
        const data = {
            name: '',
            nik: '',
            email: '',
            passengers: []
        }

        for (let i = 0; i < passengerCount; i++) {
            data.passengers.push('')
        }

        setPersonalData(data)
        setErrorMessages(data)
    }, [])

	return (
        <>
            {
                !isPayment && (
                    <main className="personal-data">
                        <div className="personal-data-container">
                            <div className="page-heading center">
                                <h3 className="page-heading-color1">Data Diri</h3>
                                <h3 className="page-heading-color2">Penumpang</h3>
                            </div>
                            <form>
                                <div className="input-item">
                                    <label className="text3" htmlFor="name">Nama Pemesan</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        placeholder="Nama" 
                                        value={personalData.name}
                                        onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
                                        required
                                    />
                                    <span className="error-message">{errorMessages.name}</span>
                                </div>
                                <div className="input-item">
                                    <label className="text3" htmlFor="nik">NIK Pemesan</label>
                                    <input 
                                        type="text" 
                                        id="nik" 
                                        name="nik" 
                                        placeholder="NIK" 
                                        value={personalData.nik}
                                        onChange={(e) => setPersonalData({...personalData, nik: e.target.value})}
                                        required
                                    />
                                    <span className="error-message">{errorMessages.nik}</span>
                                </div>
                                <div className="input-item">
                                    <label className="text3" htmlFor="email">Email Pemesan</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        value={personalData.email}
                                        onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                                        required 
                                    />
                                    <span className="error-message">{errorMessages.email}</span>
                                </div>
                                <div className="passenger-list">
                                    {
                                        Array(passengerCount).fill(0).map((_, index) => (
                                            <div className="input-item" key={index}>
                                                <label className="text3" htmlFor={`name${index + 1}`}>{`Nama Penumpang ${index + 1}`}</label>
                                                <input 
                                                    type="text" 
                                                    id={`name${index + 1}`} 
                                                    name={`name${index + 1}`} 
                                                    placeholder="Nama" 
                                                    value={personalData.passengers[index]}
                                                    onChange={(e) => {
                                                        const data = {...personalData};
                                                        data.passengers[index] = e.target.value;
                                                        setPersonalData(data);
                                                    }}
                                                    required 
                                                />
                                                <span className="error-message">{errorMessages.passengers[index]}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="input-item">
                                    <p className="text3">Total Pembayaran</p>
                                    <p className="personal-data-total-price">Rp20.000</p>
                                </div>
                                <button onClick={handleIsPayment}>BAYAR</button>
                            </form>
                        </div>
                    </main>
                )
            }
            {
                isPayment && (
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
                                                    <p className="text3">{busData?.route[0].name}</p>
                                                    <p className="text3">{busData?.route[busData.route.length - 1].name}</p>
                                                </div>
                                            </div>
                                            <div className="schedule-item">
                                                <p className="text3">Tanggal Keberangkatan</p>
                                                <div className="schedule-item-detail">
                                                    <p className="text3">{departureDate}</p>
                                                    <p className="text3"><span className="font-bold">{scheduleData?.departure_time}</span> - {scheduleData?.arrival_time}</p>
                                                </div>
                                            </div>
                                            <div className="schedule-item">
                                                <p className="text3">Jumlah Penumpang</p>
                                                <div className="schedule-item-detail">
                                                    <p className="text3">{passengerCount} Orang</p>
                                                </div>
                                            </div>
                                            <div className="schedule-item">
                                                <p className="text3">Kursi</p>
                                                <div className="schedule-item-detail">
                                                    <p className="text3">{selectedSeats.join(', ')}</p>
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
                                        <a 
                                            href={SuccessPaymentIconImage} 
                                            download={`tiket-${busData?.name}-${departureDate}.png`} 
                                            target="_blank"
                                            className="link-none" rel="noreferrer"
                                        >
                                            <button>UNDUH TIKET</button>
                                        </a>
                                    </>
                                )
                            }
                        </div>
                    </main>
                )
            }
        </>
	);
}

export default PersonalDataPayment;
