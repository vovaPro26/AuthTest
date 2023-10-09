import axios from 'axios';

const getRoute = async (firstCor, secondCor) => {
    console.log(`Getting routes for coordinates: ${firstCor} and ${secondCor}`)
    var result = await axios.get(`https://routing.openstreetmap.de/routed-car/route/v1/driving/${firstCor};${secondCor}?overview=false&alternatives=true&steps=true`)
    return result
};

export default getRoute;