import axios from 'axios';
import nprogress from 'nprogress';

let instance = axios.create({
    baseURL: 'http://secrethitler.tk/api',
    headers: {
        'Content-Type': 'application/json'
    }
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
        nprogress.done();
        return Promise.reject(error);
    }
);

export default instance;
