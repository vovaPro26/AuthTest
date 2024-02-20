
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button, TextField } from '@mui/material';
import { OSRMDecoding } from "./DecodeOSRMGeometry";
import { useForm } from "react-hook-form";
import { GetRouteQuery, AddRouteMutation } from "./UseGetRouteQuery";
import { useState } from "react";
import styled from 'styled-components';
import { useMapEvents } from "../../../node_modules/react-leaflet/lib/hooks";
import axios from 'axios';



const CorTextBox = styled.div`
    position: absolute;
    z-index: 401
`

var FirstCor
var SecondCor

const MapEvents = (props) => {
    useMapEvents({
        click: props.onClick
    });
    return false;
}

if (FirstCor === undefined || SecondCor === undefined) {
    FirstCor = "30.451323,50.383384"
    SecondCor = "30.390773,50.098232"
}

function OpenStreetMap() {
    const [cordinate, setCordinate] = useState([]);
    const { isLoading, error, data } = GetRouteQuery(cordinate)
    var firstCor
    var secondCor
    //const [mutate, { isAddRouteLoading, isError, errors }] = AddRouteMutation(cordinate)
    const customIcon = new Icon({
        iconUrl: "Mark.png",
        iconSize: [50, 50]
    })

    const decodedData = !isLoading && !!data
        ? OSRMDecoding(data)
        : [];
    


    async function onAddRouteClick(e) {
        console.log(data.data)
        if (firstCor !== undefined) {
            var results = await axios.post('/api/addroute', {
                routeData: data.data
            })
            console.log(results)
        }
    }
    const {
        handleSubmit,
        register
    } = useForm();
    const limeOptions = { color: 'lime' }
    async function onSubmit(e) {
        FirstCor = e.FirstCor
        SecondCor = e.SecondCore
        let cordinateArr = [FirstCor, SecondCor]
        setCordinate(cordinateArr)
        return { FirstCor, SecondCor }
    }

    var i = 1
    const onClick = (e) => {
        if (firstCor === undefined && i === 1) {
            firstCor = `${e.latlng.lng},${e.latlng.lat}`
            i = 2
        }
        else if (secondCor === undefined && i === 2) {
            secondCor = `${e.latlng.lng},${e.latlng.lat}`
            i = 1
        }
        if (firstCor !== undefined && secondCor !== undefined) {
            let clickCordinateArr = [firstCor, secondCor]
            setCordinate(clickCordinateArr)


        }

    }

    //var cordinateArr = cordinateArr_.map((cordinateArr_) => )
    return (
        <div>
            <MapContainer key={cordinate} center={[50.4547, 30.5238]} zoom={10}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CorTextBox>
                        <TextField
                            id="FirstCor"
                            label="First Cordinate"
                            variant="filled"
                            {...register("FirstCor")}
                        />


                        <TextField id="SecondCor" label="Second Cordinate" variant="filled" {...register("SecondCore")} />

                        <Button type="submit"
                            variant="outlined" >
                            Submit
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={onAddRouteClick}
                        >
                        Add Route
                        </Button>
                    </CorTextBox>
                    <TileLayer
                        attribution='&copy;<a href="https//www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors'
                        url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=7h6rpJcY0Ib55GV7vQkR"

                    />
                    <MapEvents onClick={onClick} />
                    <Marker position={[50.4547, 30.5238]} icon={customIcon}>
                        {!isLoading && <Polyline pathOptions={limeOptions} positions={decodedData} />}
                        <Popup>
                            I am here
                        </Popup>
                    </Marker>
                </form>
            </MapContainer>

        </div >
    )
}

export { OpenStreetMap }