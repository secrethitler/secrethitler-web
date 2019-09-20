import axios from 'axios';
import nprogress from 'nprogress';
import store from './store/index';

let instance = axios.create({
    baseURL: 'https://secrethitler.tk/api',
    // baseURL: 'https://geheimerdeutscher.tk/api',
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    nprogress.start();
    return config;
});

instance.interceptors.response.use(
    response => {
        nprogress.done();
        console.log(response.headers);
        return response;
    },
    error => {
        nprogress.done();
        return Promise.reject(error);
    }
);

export default instance;
