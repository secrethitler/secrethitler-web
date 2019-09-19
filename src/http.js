import axios from 'axios';
import nprogress from 'nprogress';
import store from './store/index';

let instance = axios.create({
    baseURL: 'https://secrethitler.tk/api',
    // baseURL: 'https://geheimerdeutscher.tk/api',
    withCredentials: true,
    headers: {
        'X-User-Id': store.getters.userId
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
