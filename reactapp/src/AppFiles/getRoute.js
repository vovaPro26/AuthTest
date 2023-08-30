import axios from 'axios';

 const  getRoute = async () => {
    var result = await axios.get('https://routing.openstreetmap.de/routed-car/route/v1/driving/30.451335,50.383384;30.234405,48.751455?overview=false&alternatives=true&steps=true')
    return result
};

export default getRoute;