import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://demeter-final-back-production.up.railway.app',
    
    withCredentials: true
})

export default instance