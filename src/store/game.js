export default {
    state: {
        user_id: null,
        channel_name: null,
        active_round: -1,
        members: [],
        rounds: [],
    },
    mutations: {
        setChannelName(state, channel_name) {
            state.channel_name = channel_name;
        },

        setUserId(state, user_id) {
            localStorage.setItem('user_id', user_id);
            state.user_id = user_id;
        },

        setMembers(state, members) {
            state.members = members;
        },

        addMember(state, member) {
            state.members.push({
                user_id: member.id,
                ...member.info
            });
        },

        removeMember(state, toRemove) {
            let members = state.members;

            let index = members.findIndex(member => member.user_id = toRemove.id);
            members.splice(index, 1);

            state.members = members;
        },

        setNewRound(state) {
            state.active_round++;
            state.rounds.push({
                president: null,
                chancellor: null,
                votes: [],
                enacted_policy: null,
            });
        },

        setNewPresident(state, president_id) {
            state.rounds[state.active_round].president = president_id;
        },

        setNominatedChancellor(state, chancellor_id) {
            state.rounds[state.active_round].chancellor = chancellor_id;
        },

        addChancellorVote(state, incomingVote) {
            state.rounds[state.active_round].votes.push(incomingVote);
        },

        setEnactedPolicy(state, policy) {
            state.rounds[state.active_round].enacted_policy = policy;
        },

        resetGame(state) {
            state.channel_name = null;
            state.active_round = -1;
            state.connections = {};
            state.members = [];
            state.rounds = [];
        },

        isPresident(state) {
            if (state.rounds.length === 0) return false;

            return state.user_id = state.rounds[state.active_round].president;
        },

        isChancellor(state) {
            if (state.rounds.length === 0) return false;

            return state.user_id = state.rounds[state.active_round].chancellor;
        },
    },
    getters: {
        members(state) {
            return state.members;
        },
        userId(state) {
            return state.user_id || localStorage.getItem('user_id');
        },
        rounds(state) {
            return state.rounds;
        },
        president(state) {
            let members = state.members;
            if (members.length === 0 || ! state.rounds[state.active_round]) {
                return null;
            }
            let president_id = state.rounds[state.active_round].president;

            return members.find(member => member.user_id === president_id);
        },
        chancellor(state) {
            let members = state.members;
            if (members.length === 0 || ! state.rounds[state.active_round]) {
                return null;
            }
            let chancellor_id = state.rounds[state.active_round].chancellor;

            return members.find(member => member.user_id === chancellor_id);
        },
    },
};
