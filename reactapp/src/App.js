import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Login } from './AppFiles/Login';
import { Home } from './AppFiles/Home';
import { Register } from './AppFiles/Register';






export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} >
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

