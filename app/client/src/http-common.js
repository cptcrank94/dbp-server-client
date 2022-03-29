import axios from 'axios';
export default axios.create({
    baseURL: 'https://dbp-restaurant-menu.herokuapp.com/',
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': "*"
    }
});