import Pusher from 'pusher-js';

let pusher = new Pusher('dbaa9e20ac7717618b2a', {
    authEndpoint: 'http://secrethitler.tk/pusher/auth',
    cluster: 'eu',
    // forceTLS: true,
});

export default pusher;
