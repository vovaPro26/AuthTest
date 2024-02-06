import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    RecoilRoot,
    selector,
    useRecoilValue
} from 'recoil';
import { AuthorizedStateTokenData } from './Login';

import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import styled from 'styled-components';
import { Map } from '@googlemaps/react-wrapper'
import { useNavigate } from "react-router-dom";
import TapAngGoNameImg from '../TapandgoName.png'
import { DefaultButton } from './Components/MuiComponents'
import { PhonePageWrapper } from './Components/PhoneWrapper'
import GoogleSignin from '../AuthGoogle2';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons'
import {
    atom,
    useRecoilState
} from 'recoil';


const ErrorContent = styled.div`
color: red;
`



const Line = styled.div`
   height: 0.4vh;
   background-color: #C9C9C9;
   width: 100%;
   border radius: 45px;
   margin-top: 3.7vh;
   
`
const GoogleLogin = styled.div`
       margin-top: 3vh;
`

const FacebookLogin = styled.div`
       margin-top: 0.5vh;
       margin-bottom: 25%;
`

const TapandGoName = styled.div`
    margin-bottom: 35%;
`


export function Start() {
    const [accsessToken, setAccsessToken] = useRecoilState(AuthorizedStateTokenData);
    const [isHomeError, setHomeError] = useState(false);
    const [data, setData] = useState("")
    const authorizedStateToken = useRecoilValue(AuthorizedStateTokenData);
    let navigate = useNavigate()
    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    const theme = createTheme({
        palette: {
            anger: createColor('#F40B27'),
            apple: createColor('#5DBA40'),
            steelBlue: createColor('#5C76B7'),
            violet: createColor('#BC00A3'),
            grey: createColor('#79747E')
        }});
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

    function OSRMOpenOnCLick() {
        navigate("/openstreetmaps")
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
        //<CentralDiv>
        //        <PhonePage>
        <PhonePageWrapper>
            <TapandGoName>
                <img src={TapAngGoNameImg}></img>
            </TapandGoName>
            <DefaultButton
                onClick={LoginClickButton}
                variant="outlined"
                color="warning"
                sx={{

                    width: "100%",
                    color: 'warning.main',
                }}>Login</DefaultButton>
            <DefaultButton
                onClick={RegisterClickButton}
                variant="outlined"
                color="warning"
                sx={{
                    width: "100%",
                    color: 'warning.main',
                }}>
                Register
            </DefaultButton>
            <Line />
            <GoogleLogin>
                <GoogleSignin />
            </GoogleLogin>
            <FacebookLogin>
                <LoginSocialFacebook
                    appId='873841367435786'
                    fieldsProfile={
                        'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                    }
                    onResolve={async (response) => {
                        console.log(response.data.accessToken);
                        var result = await axios.post('/api/socialLogin', {
                            Token: response.data.accessToken,
                            Provider: "Facebook"
                        })
                        setAccsessToken(result.data)
                        navigate("/")
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}>
                    <FacebookLoginButton />
                </LoginSocialFacebook>
            </FacebookLogin>


            {isHomeError && <ErrorContent >{isHomeError}</ErrorContent>}
        </PhonePageWrapper>
    )
}