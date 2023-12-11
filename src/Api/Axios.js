import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4080'
})

export default instance