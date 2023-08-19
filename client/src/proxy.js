import axios from 'axios';

const proxyApi = axios.create({
    baseURL: 'https://appoenmento.onrender.com', // Your backend URL
});

export default proxyApi;
