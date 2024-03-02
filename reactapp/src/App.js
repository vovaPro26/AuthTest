import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Login } from './AppFiles/Login';
import { Start } from './AppFiles/Start';
import { Home } from './AppFiles/Home';
import { Register } from './AppFiles/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleMaps  from './AppFiles/GoogleMaps';
import { OpenStreetMap } from './AppFiles/OpenStreetMaps';
import { PassangerRouteSearch } from './AppFiles/PassangerRouteSearch';
import { DriverRouteAdd } from './AppFiles/DriverRouteAdd';
import { Example } from './AppFiles/ExampleBottomSheet'
import "./styles.css";




export function App() {

    return (


        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} >
                </Route>
                <Route path="home" element={<Home/> } />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="googlemaps" element={<GoogleMaps />} />
                <Route path="openstreetmaps" element={<OpenStreetMap />} />
                <Route path="passangerroutesearch" element={<PassangerRouteSearch/> } />
                <Route path="driverroutesearch" element={<DriverRouteAdd />} />
                <Route path="example" element={<Example />} />
            </Routes>
        </BrowserRouter>


    )
}

