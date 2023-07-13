import React from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    RecoilRoot,
    selector,
    useRecoilValue
} from 'recoil';
import { AuthorizedState } from './Login';


export function Home() {
    const authorizedTextForDiv = useRecoilValue(AuthorizedState);
    return (
        <div>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <div>
                {authorizedTextForDiv}
            </div>
        <Outlet />
        </div>
    )
}