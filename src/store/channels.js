export default {
    state: {
        connections: {}    
    },

    mutations: {
        setChannel(state, channel) {
            state.connections.channel = channel;
        },
        setPresence(state, presence_channel) {
            state.connections.presence = presence_channel;
        },
        setPrivate(state, private_channel) {
            state.connections.private = private_channel;
        },
    },

    getters: {
        connections(state) {
            return state.connections;
        }
    }
}
