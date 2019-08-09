import axios from 'axios';
import nprogress from 'nprogress';

let instance = axios.create({
    baseUrl: 'https://secret-hitler-api.com/api',
});

instance.interceptors.request.use(config => {
    nprogress.start();
    return config;
});

instance.interceptors.response.use(
    response => {
        nprogress.done();
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
