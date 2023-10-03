import React, { useEffect, useState } from "react";

import "../../styles/Rute.css";
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";

function Maps() {

    const [directionsResponse, setDirectionsResponse] = useState(null);

    const { isLoaded } = useLoadScript({
        // INI HARUS DITAROH DI ENVIRONMENT VARIABLE
        googleMapsApiKey: 'AIzaSyD9RkIPAs1EdRwtQ83ok2ZzZDGwrC6J8N0',
        libraries: ['places']
    })

    function Map() {
        return <GoogleMap zoom={10} mapContainerClassName="map-container">
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
    }

    async function MapDirection() {
        const directionService = new window.google.maps.DirectionsService();

        const results = await directionService.route({
            origin: 'Terminal Leuwipanjang Bandung, Jalan Raya Sawahan, Situsaeur, Bandung City, West Java',
            destination: 'Bandung Institute of Technology, Jalan Ganesa, Lebak Siliwangi, Bandung City, West Java',
            waypoints: [
                {
                    location: 'Grand Pasundan Convention Hotel, Jalan Peta, Suka Asih, Bandung City, West Java',
                    stopover: true
                },
                {
                    location: 'Komplek Bumi Kopo Kencana, Jalan Papan Kencana III, Suka Asih, Bandung City, West Java',
                    stopover: true
                },
                {
                    location: 'Mall Festival Citylink, Jalan Peta, Suka Asih, Bandung City, West Java',
                    stopover: true
                },
                {
                    location: 'Simpang Pasir Koja, Sukahaji, Bandung City, West Java',
                    stopover: true
                },
                {
                    location: 'Spbu Pasirkoja, Jalan Terusan Pasirkoja, Babakan Tarogong, Bandung City, West Java',
                    stopover: true
                },
                {
                    location: 'hotel near Alun-alun Soreang, Jalan Raya Soreang-Ciwidey, Soreang, Bandung Regency, West Java',
                    stopover: true
                },
                {
                    location: 'Mall Pelayanan Publik Sabilulungan, Cingcin, Soreang, Bandung Regency, West Java',
                    stopover: true
                },
                {
                    location: 'RSUD OTO ISKANDAR DINATA, Cingcin, Bandung Regency, West Java',
                    stopover: true
                }
            ],
            travelMode: 'DRIVING',
            // eslint-disable-next-line no-undef
            unitSystem: google.maps.UnitSystem.IMPERIAL
        })

        setDirectionsResponse(results);
    }

    useEffect(() => {
        if (isLoaded) {
            MapDirection();
        }
    }, [isLoaded])


    if (!isLoaded) return <div>loading mapss..</div>;

    return (
        <>
            <div className="maps" id="map">
                <Map />
                {/* <img src={MapRouteDummyImage} alt="Map Route" /> */}
            </div>
            
        </>
    )
}

export default Maps;