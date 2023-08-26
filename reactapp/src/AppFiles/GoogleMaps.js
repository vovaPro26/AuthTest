//import { Map, GoogleApiWrapper } from 'google-maps-react';
//import * as React from 'react';
//function GoogleMaps(props) {

//        const mapStyles = {
//            width: '100%',
//            height: '100%',
//        };
//    render() {
//        const apiIsLoaded = (map, maps) => {
//            const directionsService = new window.google.maps.DirectionsService();
//            const directionsRenderer = new window.google.maps.DirectionsRenderer();
//            directionsRenderer.setMap(map);
//            const origin = { lat: 40.756795, lng: -73.954298 };
//            const destination = { lat: 41.756795, lng: -78.954298 };

//            directionsService.route(
//                {
//                    origin: origin,
//                    destination: destination,
//                    travelMode: window.google.maps.TravelMode.DRIVING,
//                },
//                (result, status) => {
//                    if (status === window.google.maps.DirectionsStatus.OK) {
//                        directionsRenderer.setDirections(result);
//                    } else {
//                        console.error(`error fetching directions ${result}`);
//                    }
//                }
//            );
//        };
//        console.log(props)
//        return (
//            <Map
//                google={props.google}
//                zoom={8}
//                style={mapStyles}
//                initialCenter={{ lat: 47.444, lng: -122.176 }}
//            />
//        )
//    }

//}
//export default GoogleApiWrapper({
//    apiKey: 'AIzaSyBEhJvkzB8OktKOgO7MYmxf3JJNIOtVdUw'
//})(GoogleMaps);
//__________________________________________
//import React from "react";
//import GoogleMapReact from 'google-map-react';

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

//export default function SimpleMap() {
//    const defaultProps = {
//        center: {
//            lat: 10.99835602,
//            lng: 77.01502627
//        },
//        zoom: 11
//    };

//    return (
//        // Important! Always set the container height explicitly
//        <div style={{ height: '100vh', width: '100%' }}>
//            <GoogleMapReact
//                bootstrapURLKeys={{ key: "AIzaSyBEhJvkzB8OktKOgO7MYmxf3JJNIOtVdUw" }}
//                defaultCenter={defaultProps.center}
//                defaultZoom={defaultProps.zoom}
//            >
//                <AnyReactComponent
//                    lat={59.955413}
//                    lng={30.337844}
//                    text="My Marker"
//                />
//            </GoogleMapReact>
//        </div>
//    );
//}
//_________________________________________________
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class GoogleMaps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocation: { lat: 50.381409, lng: 30.451337 },
        };
    }

    render() {
        const apiIsLoaded = (map, maps) => {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            const origin = { lat: 50.381409, lng: 30.451337 };
            const destination = { lat: 48.751607, lng: 30.234476 };

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        };
        return (
            <div>
                <div style={{ height: '400px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyBEhJvkzB8OktKOgO7MYmxf3JJNIOtVdUw',
                        }}
                        defaultCenter={{ lat: 49.629480, lng: 30.198553 }}
                        defaultZoom={10}
                        center={this.state.currentLocation}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                    />
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}
export default GoogleMaps;