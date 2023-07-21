import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    RecoilRoot,
    selector,
    useRecoilValue
} from 'recoil';
import { AuthorizedStateTokenData } from './Login';
import { Button } from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';

const ErrorContent = styled.div`
color: red;
`

export function Home() {
    const [isHomeError, setHomeError] = useState(false);
    const [data, setData] = useState("")
    const authorizedStateToken = useRecoilValue(AuthorizedStateTokenData);
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
    return (
        <div>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <Button onClick={GetData}>
                GetData
            </Button>
            <div>
                {data}
            </div>
            {isHomeError && <ErrorContent >{isHomeError}</ErrorContent>}           
        </div>
    )
}