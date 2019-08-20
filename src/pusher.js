import Pusher from 'pusher-js';

let pusher = new Pusher('dbaa9e20ac7717618b2a', {
    authEndpoint: 'https://51.68.188.114/api/pusher/auth',
    auth: {
        headers: {
            
        }
    },
    cluster: 'eu',
    // forceTLS: true,
});

export default pusher;
