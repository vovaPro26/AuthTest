import React from 'react';
import styled from 'styled-components';
import { Button, TextField, AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";


const MainDivLogin = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5vh;
`

const Login = styled.div`
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


export function App() {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    console.log(errors.email)
    return (
        <MainDivLogin>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} >
                <form onSubmit={handleSubmit(console.log)}>
                    <Panel> 
                        <Login >
                            Login
                        </Login>
                        <InputsZone>
                            <div>
                                <Inputs>
                                    <TextField
                                        id="Email"
                                        label="Email"
                                        variant="filled"
                                        helperText={errors.email && errors.email.message }
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
                                variant="outlined">
                                Login
                            </Button>
                        </BudttonLogin>
                    </Panel>
                </form>
            </Box>
        </MainDivLogin>
    )
}
