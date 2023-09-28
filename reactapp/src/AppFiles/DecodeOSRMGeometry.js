import { decode, encode } from "@googlemaps/polyline-codec";
import getRoute from "./getRoute";
import axios from 'axios';
export function OSRMDecoding(resGetRoute) {
    //let StringGeometryArr = []
    let Cordinate = []
    for (let i = 0; i < resGetRoute.data.routes[0].legs[0].steps.length; i++) {
        Cordinate.push(decode(resGetRoute.data.routes[0].legs[0].steps[i].geometry, 5));
        //StringGeometryArr.push(resGetRoute.data.routes[0].legs[0].steps[i].geometry)
    }

    return Cordinate

}