import { decode, encode } from "@googlemaps/polyline-codec";
import getRoute from "./getRoute";
export async function OSRMDecoding() {
    let Cordinate = []
    var resGetRoute = await getRoute()
    console.log(resGetRoute)
    //for (let route in resGetRoute.routes) {
    //    console.log(route.legs);
    //}
    for (let i = 0; i < resGetRoute.data.routes[0].legs[0].steps.length; i++) {
        Cordinate.push(decode(resGetRoute.data.routes[0].legs[0].steps[i].geometry, 5));
    }
    console.log(Cordinate)

    return Cordinate

}