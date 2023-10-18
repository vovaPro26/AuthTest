import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    RecoilRoot,
    selector,
    useRecoilValue
} from 'recoil';
import { AuthorizedStateTokenData } from './Login';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import styled from 'styled-components';
import { Map } from '@googlemaps/react-wrapper'
import { useNavigate } from "react-router-dom";

const CentralDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`
const ErrorContent = styled.div`
color: red;
`
const PhonePageWrapper = styled.div`
width: 100%;
height: 95vh;
padding:2.4vh

`
const PhonePage = styled.div`
display: flex;

height: 100%;
margin-left: 25px;
margin-right: 25px;
align-items: center;
justify-content: center;
flex-direction: column;

`
const AllButtons = styled.button`
display: flex;
width: 100%;
height: 64px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 8px;
flex-shrink: 0;
border-radius: 15px;
border: 1px solid var(--m-3-sys-light-outline, #79747E);
background-color: white;
`
const Text = styled.div`
color: #FF7A4F;
text-align: center;
font-family: Roboto;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 66.667% */
letter-spacing: 0.1px;
`

export function Home() {
    const [isHomeError, setHomeError] = useState(false);
    const [data, setData] = useState("")
    const authorizedStateToken = useRecoilValue(AuthorizedStateTokenData);
    let navigate = useNavigate()
    //const theme = createTheme({
    //    palette: {
    //        ochre: {
    //            main: gray,
    //            light: ,
    //            dark: ,
    //            contrastText: '#242105',
    //        },
    //    },
    //});
    async function GetData() {
        try {
            var response = await axios.get('/api/data', {
                headers: {
                    'Authorization': `Bearer ${authorizedStateToken}`
                }
            })
            setHomeError("");
            setData(response.data)
        } catch (e) {
            if (!e.response) {
                setHomeError("Can't access server");
                return;
            }

            switch (e.response.status) {
                case (401):
                    setHomeError("You are not authorized");
                    break;
                case (500):
                    setHomeError("Error! Please contact administrator");
                    break;
                default:
                    setHomeError("Unknown error!");

            }
        }

    }
    function LoginClickButton() {
        navigate("/login")
    }
    function RegisterClickButton() {
        navigate("/register")
    }
    async function GetSecureData() {
        try {
            var response = await axios.get('/api/securedata', {
                headers: {
                    'Authorization': `Bearer ${authorizedStateToken}`
                }
            })
            setHomeError("");
            setData(response.data)
        } catch (e) {
            if (!e.response) {
                setHomeError("Can't access server");
                return;
            }

            switch (e.response.status) {
                case (401):
                    setHomeError("You are not authorized");
                    break;
                case (500):
                    setHomeError("Error! Please contact administrator");
                    break;
                default:
                    setHomeError("Unknown error!");

            }
        }

    }
    return (
        <CentralDiv>
            <PhonePageWrapper>
                <PhonePage>
                    {/*<AllButtons onClick={LoginClickButton}><Text>Login</Text> </AllButtons>*/}
                    {/*<AllButtons onClick={RegisterClickButton}><Text>Register</Text> </AllButtons>*/}
                    <Button onClick={LoginClickButton} variant="outlined" color="warning" sx={{
                        width: "50%",
                        color: 'warning.main',
                    }}>Login</Button>
                    {/*<li>*/}
                    {/*    <Link to="/login">Login</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/register">Register</Link>*/}
                    {/*</li>*/}
                </PhonePage>
            </PhonePageWrapper>
            <li>
                <Link to="/googlemaps">Google Map</Link>
            </li>
            <li>
                <Link to="/openstreetmaps">Open Street Map</Link>
            </li>
            <Button onClick={GetData}>
                Get Data
            </Button>
            <Button onClick={GetSecureData}>
                Get Secured
            </Button>
            <div>
                {data}
            </div>
            {isHomeError && <ErrorContent >{isHomeError}</ErrorContent>}
        </CentralDiv>
    )
}