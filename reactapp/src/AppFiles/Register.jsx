import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";
import axios from 'axios';


const MainDivRegister = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5vh;
`

const RegisterStyle = styled.div`
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

const BudttonReg = styled.div`

  margin-bottom:3px;
`

const ErrorContent = styled.div`
color: red;
`


export function Register() {
    const isEven = (score, a, b) => {
        console.log(score);
        console.log(a);
        if (a.Password === score) {
            return true;
        } else {
            return "The password does not match";
        }
    }
    const [isRegisterError, setRegisterErrorState] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    async function onSubmit(e) {
        try {
            var result = await axios.post('/api/register', {
                email: e.email,
                password: e.Password
            })
            setRegisterErrorState("")

        } catch (e) {

            switch (e.response.status) {
                case (409):
                    setRegisterErrorState("User with such email already exist");
                    break;
                default:
                    setRegisterErrorState("Unknown error!");

            }
        };
        console.log(result);

    };
    return (
        <MainDivRegister>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Panel>
                    <RegisterStyle >
                        Register
                    </RegisterStyle>
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
                            <Inputs>
                                <TextField error={errors.RePassword} id="RePassword" label="Re enter Password" variant="filled" helperText={errors.RePassword && errors.RePassword.message}
                                    {...register("RePassword", {
                                        required: "Password is required",
                                        validate: isEven,
                                        pattern: {
                                            message: "The password does not match"
                                        }
                                    })} />
                            </Inputs>
                        </div>
                    </InputsZone>
                    <BudttonReg>
                        <Button color="success" type="submit"
                            variant="outlined" >
                            Register
                        </Button>
                    </BudttonReg>
                    {isRegisterError && <ErrorContent >{isRegisterError}</ErrorContent>}     
                </Panel>
            </form>
        </MainDivRegister>
    )
}