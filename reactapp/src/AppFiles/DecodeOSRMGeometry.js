import { decode, encode } from "@googlemaps/polyline-codec";
import getRoute from "./getRoute";
export function OSRMDecoding() {
    let Cordinate = []
    var resGetRoute = getRoute()

    //for (let route in resGetRoute.routes) {
    //    console.log(route.legs);
    //}
    for (let i = 0; i < resGetRoute.routes[0].legs[0].steps.length; i++) {
        Cordinate.push(decode(resGetRoute.routes[0].legs[0].steps[i].geometry, 5));
    }
    console.log(Cordinate)

    return Cordinate

}