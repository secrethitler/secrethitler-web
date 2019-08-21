import axios from 'axios';
import nprogress from 'nprogress';
import qs from 'querystring';

let instance = axios.create({
    baseURL: 'https://secrethitler.tk/api',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

instance.interceptors.request.use(config => {
    nprogress.start();
    config.data = qs.stringify(
        config.data
    );
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
