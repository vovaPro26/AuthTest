import React from 'react';
import styled from 'styled-components';
import { Button, TextField, AppBar, Toolbar, Typography, Box } from '@material-ui/core';

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
    return (
        <MainDivLogin>
            <Box component="span" sx={{p: 2, border: '1px dashed grey'}} >
                <Panel>
                    <Login >
                        Login
                    </Login>
                    <InputsZone>
                        <div>
                            <Inputs>
                                <TextField id="Email" label="Email" variant="filled" />
                            </Inputs>
                            <Inputs>
                                <TextField id="Password" label="Password" variant="filled" />
                            </Inputs>
                        </div>
                    </InputsZone>
                    <BudttonLogin>
                        <Button color="success"
                            variant="outlined">
                            Login
                        </Button>
                    </BudttonLogin>
                </Panel>
            </Box>
        </MainDivLogin>
    )
}
