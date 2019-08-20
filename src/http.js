import axios from 'axios';
import nprogress from 'nprogress';

// Memes
// https://send.firefox.com/download/540555943cfcabcc/#Ss4jlPBCm5btC4ZWeSWiMA

let instance = axios.create({
    baseURL: 'https://51.68.188.114/api'
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
