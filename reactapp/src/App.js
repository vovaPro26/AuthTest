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
            </Routes>
        </BrowserRouter>


    )
}

