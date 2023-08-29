
import { MapContainer, TileLayer, Marker, Popup ,Polyline } from "react-leaflet";
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

import { OSRMDecoding } from "./DecodeOSRMGeometry";


export function OpenStreetMap() {
    const customIcon = new Icon({
        iconUrl: "Mark.png",
        iconSize: [50, 50]
    })
    const limeOptions = { color: 'lime' }

    var cordinateArr_ = OSRMDecoding()
    console.log(cordinateArr_)
    //var cordinateArr = cordinateArr_.map((cordinateArr_) => )
    return (
        <div>
            <MapContainer center={[50.4547, 30.5238]} zoom={10}>
                <TileLayer
                    attribution='&copy;<a href="https//www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors'
                    url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=7h6rpJcY0Ib55GV7vQkR"
                />
                <Marker position={[50.4547, 30.5238]} icon={customIcon}>
                    <Popup>
                        I am here
                    </Popup>
                </Marker>
                <Polyline pathOptions={limeOptions} positions={cordinateArr_} />
            </MapContainer>

        </div>
    )
}
