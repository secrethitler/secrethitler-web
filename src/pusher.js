import Pusher from 'pusher-js';

let pusher = new Pusher('dbaa9e20ac7717618b2a', {
    authEndpoint: 'https://api.secrethitler.tk/api/pusher/auth',
    cluster: 'eu',
    // forceTLS: true,
});

export default pusher;
