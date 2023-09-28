

import {
    useQuery,
    useMutation
} from '@tanstack/react-query'
import axios from 'axios';
import getRoute from "./getRoute";

export function GetRouteQuery(cordinateArr) {
    console.log(cordinateArr.length)
    const isEnabled = cordinateArr != null && cordinateArr.length >= 2
    return useQuery({
        enabled: isEnabled,
        queryKey: ['repoData', ...cordinateArr],
        queryFn: async () => {
            var resGetRoute = await getRoute(cordinateArr[0].replace(/\s+/g, ''), cordinateArr[1].replace(/\s+/g, ''))
            return resGetRoute
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