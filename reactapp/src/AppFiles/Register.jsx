import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, TextField, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { PhonePageWrapper } from './Components/PhoneWrapper'
import { DefaultButton } from './Components/MuiComponents'
import TapAngGoNameImg from '../TapandgoName.png'
import { useNavigate } from "react-router-dom";
import { theme as newTheme } from './Components/NewTheme'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';



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
const RegisterStyle = styled.div`
       font-size: 1.8em;
    margin-bottom: 2vh;
    font-family: serif;

`

const RegisterDiv = styled.div`
    margin-top: 55%
`

const HaveAnAcountDiv = styled.div`

    margin-top: 2%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`


const BudttonReg = styled.div`

  margin-bottom:3px;
`

const ErrorContent = styled.div`
color: red;
`
const TextFieldDiv = styled.div`
    width: 100%;
    margin-bottom: 2vh;
    
`

const TapandgoDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

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
    let navigate = useNavigate()

    function GoToTheLogin() {
        navigate('/login');
    }

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
        <ThemeProvider theme={newTheme}>
            <PhonePageWrapper>

                <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                    <TapandgoDiv>
                        <img src={TapAngGoNameImg}></img>
                    </TapandgoDiv>
                    <RegisterDiv>
                        <RegisterStyle >
                            Register
                        </RegisterStyle>

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
                            <TextFieldOrange error={errors.Password} fullWidth type="password" id="Password" label="Password" variant="filled" helperText={errors.Password && errors.Password.message}
                                {...register("Password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,14}$/i,
                                        message: "Password is incorrect"
                                    }
                                })} />
                        </TextFieldDiv>


                        <TextFieldDiv fullWidth>
                            <TextFieldOrange error={errors.RePassword} fullWidth type="password" id="RePassword" label="Re enter Password" variant="filled" helperText={errors.RePassword && errors.RePassword.message}
                                {...register("RePassword", {
                                    required: "Password is required",

                                    validate: isEven,
                                    pattern: {
                                        message: "The password does not match"
                                    }
                                })} />
                        </TextFieldDiv>



                        <BudttonReg>
                            <DefaultButton color="warning" type="submit"
                                variant="outlined" >
                                Register
                            </DefaultButton>
                        </BudttonReg>
                        <HaveAnAcountDiv>
                            Have an account
                            <Button color="warning" onClick={GoToTheLogin}>Login</Button>
                        </HaveAnAcountDiv>
                        {isRegisterError && <ErrorContent >{isRegisterError}</ErrorContent>}
                    </RegisterDiv>
                </form>

            </PhonePageWrapper>
        </ThemeProvider>
    )
}