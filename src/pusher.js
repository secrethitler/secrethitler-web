import Pusher from 'pusher-js';
import http from './http';

let pusher = new Pusher('dbaa9e20ac7717618b2a', {
    authEndpoint: 'https://api.secrethitler.tk/api/pusher/auth',
    cluster: 'eu',
    authorizer: ({ name }) => ({
        authorize: async (socketId, callback) => {
            try {
                let res = await http.post('/pusher/auth', {
                    socketId: socketId,
                    channelName: name
                });

                callback(false, res.data);
            } catch(err) {
                callback(true, null);
            }
        },
    }),
    // forceTLS: true,
});

export default pusher;
