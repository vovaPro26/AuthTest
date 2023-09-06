
import { OSRMDecoding } from "./DecodeOSRMGeometry";
import {
    useQuery
} from '@tanstack/react-query'


export function GetRouteQuery(cordinateArr) {
    console.log(cordinateArr.length)
    const isEnabled = cordinateArr != null && cordinateArr.length >= 2
    return useQuery({
        enabled: isEnabled,
        queryKey: ['repoData', ...cordinateArr],
        queryFn: async () => {
            var cordinateArr_ = await OSRMDecoding(cordinateArr[0].replace(/\s+/g, ''), cordinateArr[1].replace(/\s+/g, ''))
            return cordinateArr_
        }
    })
}