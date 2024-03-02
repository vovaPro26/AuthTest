import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { PhonePageWrapper } from './Components/PhoneWrapper'
import styled from 'styled-components';
import { DefaultButton } from './Components/MuiComponents'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Sheet from 'react-modal-sheet';
import { useState } from 'react';


const DownMenu = styled.div`
    height: 100%;
    width: 100%;


`
const RecentTripsTextDiv = styled.div`
    font-size: 20px;
    margin-top: -1vh;
`

const ScrollingDiv = styled.div`
    overflow-y: scroll; 
    height:19vh;
    width: 75%;
    margin-top: 1vh;
`

const RecentTrip = styled.div`
    width: 100%;
    background-color: #D9D9D9;
    height: 32px;
    border-radius: 8px;
    margin-top: -5vh
`
const NextButton = styled.div`
    z-index: 1000;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFFAA;
    height: 100px;
    width: 100%;
`



export function DriverRouteAdd() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <NextButton>
                <PhonePageWrapper>
                    <DefaultButton color="warning">
                        Next
                    </DefaultButton>
                </PhonePageWrapper>
            </NextButton>
            <MapContainer center={[50.4547, 30.5238]} zoom={10}>


                <TileLayer
                    attribution='&copy;<a href="https//www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors'
                    url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=7h6rpJcY0Ib55GV7vQkR"

                />
            </MapContainer>

        </>
    )
}