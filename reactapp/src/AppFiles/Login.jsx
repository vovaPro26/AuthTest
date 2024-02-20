import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import {
    atom,
    useRecoilState
} from 'recoil';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import GoogleSignin from '../AuthGoogle2';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons'
import TapAngGoNameImg from '../TapandgoName.png'
import { PhonePageWrapper } from './Components/PhoneWrapper'
import { styled as styleMui } from '@mui/material/styles';
import { color } from '../../../node_modules/@mui/system/index';
import { theme as newTheme } from './Components/NewTheme'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { DefaultButton } from './Components/MuiComponents'







const LoginStyle = styled.div`
    font-size: 1.8em;
    margin-bottom: 2vh;
    font-family: serif;
`

const TextFieldOrange = styled(TextField)`

    & .MuiFilledInput-underline:before {
        border-color:#FF7A4F;
    }
     & .MuiFilledInput-underline:after {
        border-color:#FF7A4F;
    }
     & .MuiFilledInput-underline:hover {
            border-color:#FF7A4F;
 }
 
`

const TextFieldDiv = styled.div`
    width: 100%;
    margin-bottom: 2vh;
    
`

const LoginDiv = styled.div`
    margin-top: 55%
`

const DontHaveAnAcountDiv = styled.div`
    margin-top: 2%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TapandgoDiv = styled.div`

    width: 100%;
    display: flex;
    justify-content: center;
`



const ButtonLogin = styled.div`

  
`

const ErrorContent = styled.div`
color: red;
`


export const AuthorizedStateTokenData = atom({
    key: 'AuthorizedStateTokenData', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});
export function Login() {
    const [isLoginError, setLoginErrorState] = useState(false);
    const [accsessToken, setAccsessToken] = useRecoilState(AuthorizedStateTokenData);
    let navigate = useNavigate()


    const responseFacebook = (response) => {
        console.log(response);
    }
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    function GoToTheRegister() {
        navigate('/register');
    }

    async function onSubmit(e) {
        try {
            var results = await axios.post('/api/login', {
                email: e.email,
                password: e.Password
            })
            setAccsessToken(results.data)
            setLoginErrorState("")

        } catch (e) {
            switch (e.response.status) {
                case (404):
                    setLoginErrorState("Invalid login");
                    break;
                default:
                    setLoginErrorState("Unknown error!");

            }
        };
        console.log(accsessToken);

    };

    return (
        <>
            <ThemeProvider theme={newTheme}>
                <PhonePageWrapper>
                    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                        <TapandgoDiv>
                            <img src={TapAngGoNameImg}></img>
                        </TapandgoDiv>
                        <LoginDiv>
                            <LoginStyle >
                                Login
                            </LoginStyle>
                            <TextFieldDiv fullWidth>
                                <TextFieldOrange
                                    id="Email"
                                    label="Email"
                                    variant="filled"
                                    fullWidth
                                    helperText={errors.email && errors.email.message}
                                    error={errors.email}
                                    sx={{ input: { color: 'orange' } }}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Email is invalid"
                                        }
                                    })} />
                            </TextFieldDiv>


                            <TextFieldDiv fullWidth>
                                <TextFieldOrange error={errors.Password} fullWidth id="Password" label="Password" color="warning" variant="filled" helperText={errors.Password && errors.Password.message}
                                    {...register("Password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,14}$/i,
                                            message: "Password is incorrect"
                                        }
                                    })} />
                            </TextFieldDiv>




                            <ButtonLogin>
                                <DefaultButton color="warning" type="submit"
                                    variant="outlined" sx={{
                                        width: "100%",
                                        color: 'warning.main',
                                    }}>
                                    Login
                                </DefaultButton>
                            </ButtonLogin>
                            {isLoginError && <ErrorContent >The Login is incorrect</ErrorContent>}
                            <DontHaveAnAcountDiv>
                                Don’t have an account?
                                <Button color="warning" onClick={GoToTheRegister}>Register</Button>
                            </DontHaveAnAcountDiv>
                        </LoginDiv>
                    </form>

                </PhonePageWrapper>
            </ThemeProvider>
            <Outlet />
        </>
    )
}