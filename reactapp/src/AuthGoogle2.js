import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    atom,
    useSetRecoilState
} from 'recoil';
import { AuthorizedStateTokenData } from './AppFiles/Login';
import axios from 'axios';
//import { AppDispatch } from "../../../redux/storeTypes";



const GOOGLE_CLIENT_ID = "273047399993-fvbi5ls1tocl2p4v76gu7kk9rcmo5q3i.apps.googleusercontent.com";





// We use an approach that is described on 
// https://dev.to/mremanuel/add-the-new-google-sign-in-to-your-react-app-p6m


export default function GoogleSignin() {
    const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)
    const [user, setUser] = useState({ _id: undefined })
    const setAccsessToken = useSetRecoilState(AuthorizedStateTokenData);

    let navigate = useNavigate()

    const handleGoogleSignIn = useCallback(async (res) => {
        if (!res.clientId || !res.credential) return;
        // Implement your login mutations and logic here.
        // Set cookies, call your backend, etc.
        let token = res.credential
        console.log(token)
        var result = await axios.post('/api/googlelogin', {
            googleToken: token
        })
        setAccsessToken(result.data)
        
        // givenName = decoded.given_name.parse(localStorage.a); // parse to date object
        // Email = decoded.family_name.parse(localStorage.b);
        // familyName = decoded.email.parse(localStorage.b);
        // console.log(givenName - Email - familyName); // now, this will work
        navigate("/")

        // TODO: retrieve user data
        setUser({ _id: 1 });
    }, []);

    useEffect(() => {
        if (user?._id || gsiScriptLoaded) return

        const initializeGsi = () => {
            if (!window.google || gsiScriptLoaded) return

            setGsiScriptLoaded(true)
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID || "",
                callback: handleGoogleSignIn,
            })
        }

        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.onload = initializeGsi
        script.async = true
        script.id = "google-client-script"
        document.querySelector("body")?.appendChild(script)

        return () => {
            // Cleanup function that runs when component unmounts
            window.google?.accounts.id.cancel()
            document.getElementById("google-client-script")?.remove()
        }
    }, [handleGoogleSignIn, gsiScriptLoaded, user?._id])

    return <div className={"g_id_signin"}
        data-type="standard "
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="center" />
}