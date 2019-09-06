import axios from 'axios';
import nprogress from 'nprogress';

let instance = axios.create({
    baseURL: 'https://api.geheimerdeutscher.tk/api',
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }
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
