

import {
    useQuery,
    useMutation
} from '@tanstack/react-query'
import axios from 'axios';
import getRoute from "./getRoute";

const config = { 
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    },
    secured: false

}

export function useStreetAutocompleteQuery(address) {
    const isEnabled = address && address.length > 1;
    return useQuery({
        enabled: isEnabled,
        queryKey: ['streetAutocompleteQuery', address],
        queryFn: async () => {
            return await axios.get(`/api/streetautocompletedata?address=${address}`, config);                
        }

    })
}
export function GetRouteQuery(cordinateArr) {
    console.log(cordinateArr.length)
    const isEnabled = cordinateArr != null && cordinateArr.length >= 2
    return useQuery({
        enabled: isEnabled,
        queryKey: ['repoData', ...cordinateArr],
        queryFn: async () => {
            return await getRoute(cordinateArr[0].replace(/\s+/g, ''), cordinateArr[1].replace(/\s+/g, ''));
        }
    })
}

export function AddRouteMutation(cordinateString) {
    return useMutation({
        mutationKey: ['postData'],
        mutationFn: async () => {
            var result = axios.post('/api/addroute', {
                cordinateString: cordinateString                  
            })
        }
    })
}