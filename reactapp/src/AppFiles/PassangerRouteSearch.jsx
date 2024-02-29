import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

export function PassangerRouteSearch() {
    return (
        <>
            <MapContainer center={[50.4547, 30.5238]} zoom={10}>
                <TileLayer
                    attribution='&copy;<a href="https//www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors'
                    url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=7h6rpJcY0Ib55GV7vQkR"

                />
            </MapContainer>

        </>
    )
}