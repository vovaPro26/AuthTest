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







const MainDivLogin = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5vh;
`

const LoginStyle = styled.div`
    font-size: 1.5em;

`
const Panel = styled.div`
    width: 25em;
    border: solid 1px;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
`

const InputsZone = styled.div`
    width: 13em;
    display:flex;
    justify-content: center;
`

const Inputs = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
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

            <MainDivLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Panel>
                        <LoginStyle >
                            Login
                        </LoginStyle>
                        <InputsZone>
                            <div>
                                <Inputs>
                                    <TextField
                                        id="Email"
                                        label="Email"
                                        variant="filled"
                                        helperText={errors.email && errors.email.message}
                                        error={errors.email}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Email is invalid"
                                            }
                                        })} />
                                </Inputs>
                                <Inputs>
                                    <TextField error={errors.Password} id="Password" label="Password" variant="filled" helperText={errors.Password && errors.Password.message}
                                        {...register("Password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,14}$/i,
                                                message: "Password is incorrect"
                                            }
                                        })} />
                                </Inputs>

                            </div>
                        </InputsZone>
                        <BudttonLogin>
                            <Button color="success" type="submit"
                                variant="outlined" >
                                Login
                            </Button>
                        </BudttonLogin>
                        {isLoginError && <ErrorContent >The Login is incorrect</ErrorContent>}
                    </Panel>
                    <GoogleSignin />
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
                        } }>
                        <FacebookLoginButton/>
                    </LoginSocialFacebook>
                </form>

            </MainDivLogin>

            <Link to="/">Home</Link>
            <Outlet />
        </>
    )
}