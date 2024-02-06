import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
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







const LoginStyle = styled.div`
    font-size: 1.5em;

`

const TextFieldOrange = styled(TextField)`

    & .MuiFilledInput-underline:before {
        border-bottom: 1px solid #FF3D00;
    }

`


const Inputs = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%
`

const BudttonLogin = styled.div`

  margin-bottom:3px;
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <LoginStyle >
                            Login
                        </LoginStyle>

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


                        <TextFieldOrange error={errors.Password} fullWidth id="Password" label="Password" color="warning" variant="filled" helperText={errors.Password && errors.Password.message}
                            {...register("Password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,14}$/i,
                                    message: "Password is incorrect"
                                }
                            })} />


                        <BudttonLogin>
                            <Button color="success" type="submit"
                                variant="outlined" >
                                Login
                            </Button>
                        </BudttonLogin>
                        {isLoginError && <ErrorContent >The Login is incorrect</ErrorContent>}
                    </form>

                </PhonePageWrapper>
            </ThemeProvider>
            <Outlet />
        </>
    )
}