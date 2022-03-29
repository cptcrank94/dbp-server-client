import axios from 'axios';
var base_url = window.location.origin + ':';
export default axios.create({
    baseURL: base_url + process.env.PORT,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': "*"
    }
});