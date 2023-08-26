
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"

export function OpenStreetMap() {

    return (
        <div>
            <MapContainer center={[50.4547, 30.5238]} zoom={10}>
                <TileLayer
                    attribution='&copy;<a href="https//www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}