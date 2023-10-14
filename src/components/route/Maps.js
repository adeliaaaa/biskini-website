import React, { useEffect, useState } from "react";

import "../../styles/Rute.css";
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";

function Maps( {routeData} ) {

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
        

        const waypointsRoute = routeData.map((data) => {
            return {
                location: data.location,
                stopover: data.stopover
            }  
        })

        const results = await directionService.route({
            origin: 'Terminal Leuwipanjang Bandung, Jalan Raya Sawahan, Situsaeur, Bandung City, West Java',
            destination: 'Bandung Institute of Technology, Jalan Ganesa, Lebak Siliwangi, Bandung City, West Java',
            waypoints: waypointsRoute,
            travelMode: 'DRIVING',
            // eslint-disable-next-line no-undef
            unitSystem: google.maps.UnitSystem.IMPERIAL
        })

        setDirectionsResponse(results);
    }

    useEffect(() => {
        console.log(routeData);
        console.log(isLoaded);
        if (isLoaded) {
            MapDirection();
        }
    }, [isLoaded])


    if (!isLoaded) return <div>loading mapss..</div>;

    return (
        <>
            <div className="maps" id="map">
                {
                    !routeData ? (
                        <h1>No data found..</h1>
                    ): (
                        <Map />
                    )
                }
            </div>
            
        </>
    )
}

export default Maps;