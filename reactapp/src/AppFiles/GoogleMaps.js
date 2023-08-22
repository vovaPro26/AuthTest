import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
export function GoogleMaps() {
    const REACT_APP_GOOGLE_API_KEY = "AIzaSyBEhJvkzB8OktKOgO7MYmxf3JJNIOtVdUw"
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLE_API_KEY,
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    return (
        <div>
        
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName=""
                    center={center}
                    zoom={10}
                >
                    <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
                </GoogleMap>
            )}
        </div>
    )

}