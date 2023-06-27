import React from 'react';
import { Outlet, Link } from "react-router-dom";

export function Home() {
    return (
        <div>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        <Outlet />
        </div>
    )
}