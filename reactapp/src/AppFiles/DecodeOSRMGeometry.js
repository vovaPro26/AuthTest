import { decode, encode } from "@googlemaps/polyline-codec";
import getRoute from "./getRoute";
export async function OSRMDecoding(firstcor, secondcor) {
    let Cordinate = []
    var resGetRoute = await getRoute(firstcor, secondcor)
    for (let i = 0; i < resGetRoute.data.routes[0].legs[0].steps.length; i++) {
        Cordinate.push(decode(resGetRoute.data.routes[0].legs[0].steps[i].geometry, 5));
    }

    return Cordinate

}