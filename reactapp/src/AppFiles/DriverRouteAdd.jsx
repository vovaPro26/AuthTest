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

const DownMenu = styled.div`
    display: flex;
    position: fixed;
    z-index: 500;
    width: 100%;
    height: 27%;
    border-radius: 5% 5% 0% 0%;
    background-color: white;
    bottom: 0px;

`
const RecentTripsTextDiv = styled.div`
    font-size: 20px;
    margin-top: 1vh;
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
    margin-top: 1vh
`
const NextButton = styled.div`
    margin-top: 4vh;
    display: flex;
    height: 100%;
    width: 100%;
`

export function DriverRouteAdd() {

    return (
        <>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <DirectionsIcon />
                    </IconButton>
            </Paper>
            
            

            <MapContainer center={[50.4547, 30.5238]} zoom={10}>


                <TileLayer
                    attribution='&copy;<a href="https//www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors'
                    url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=7h6rpJcY0Ib55GV7vQkR"

                />
            </MapContainer>

        </>
    )
}