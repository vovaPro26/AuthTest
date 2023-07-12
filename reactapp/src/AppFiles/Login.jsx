import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";
import axios from 'axios';


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


export function Login() {
    const [isLoginError, setLoginErrorState] = useState(false);
    const [result, setResult] = useState(false);
    const [responses, setResponse] = useState(false);
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
            setResult(results)
            setLoginErrorState(false)

        } catch (e) {
            setLoginErrorState(true)
        };
        console.log(result);
    };
    async function GetData() {
        try {

            const data = await axios.get('/api/data', {
                headers: {
                    'Authorization': `Bearer ${result.data}`
                }
            })
            setLoginErrorState(false)
            setResponse(data.data)
        } catch (e) {
            setLoginErrorState(true)
        }

    }
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
                </form>
            </MainDivLogin>
            <Button onClick={GetData}>
                GetData
            </Button>
            <div>
                {responses}
            </div>
        </>
    )
}