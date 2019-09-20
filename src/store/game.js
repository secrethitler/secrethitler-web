import storage from '../storage';

export default {
    state: {
        user_id: null,
        channel_name: null,
        active_round: -1,
        role: '',
        party_members: [],
        members: [],
        rounds: [],
        killed: [],
        running: false,
    },
    mutations: {
        setChannelName(state, channel_name) {
            state.channel_name = channel_name;
            storage.set('channel_name', state.channel_name);
        },

        setUserId(state, user_id) {
            state.user_id = user_id;
            storage.set('user_id', state.user_id);
        },

        setMembers(state, members) {
            state.members = members;
            storage.set('members', members);
        },

        setNewRound(state) {
            state.active_round++;
            state.rounds.push({
                president: null,
                chancellor: null,
                chancellor_elected: false,
                votes: [],
                enacted_policy: null,
            });

            storage.set('active_round', state.active_round);
            storage.set('rounds', state.rounds);
        },

        setNewPresident(state, president_id) {
            state.rounds[state.active_round].president = president_id;
            storage.set('rounds', state.rounds);
        },

        setNominatedChancellor(state, chancellor_id) {
            state.rounds[state.active_round].chancellor = chancellor_id;
            storage.set('rounds', state.rounds);
        },

        addChancellorVote(state, incomingVote) {
            state.rounds[state.active_round].votes.push(incomingVote);
            storage.set('rounds', state.rounds);
        },

        setEnactedPolicy(state, policy) {
            state.rounds[state.active_round].enacted_policy = policy;
            storage.set('rounds', state.rounds);
        },

        setElected(state, elected) {
            state.rounds[state.active_round].chancellor_elected = elected;
            storage.set('rounds', state.rounds);
        },

        resetGame(state) {
            state.channel_name = null;
            state.active_round = -1;
            state.role = '';
            state.party_members = [];
            state.connections = {};
            state.rounds = [];
            state.killed = [];
            state.running = false;

            storage.remove('channel_name');
            storage.remove('active_round');
            storage.remove('rounds');
            storage.remove('role');
            storage.remove('party_members');
            storage.remove('killed');
        },

        startGame(state, event) {
            console.log(event);
            state.role = event.roleName;
            state.party_members = event.partyMembers;
            state.running = true;

            storage.set('role', event.roleName);
            storage.set('party_members', event.partyMembers);
        },

        killPlayer(state, id) {
            state.killed.push(id);
            storage.set('killed', state.killed);
        }
    },
    getters: {
        members(state, getters) {
            let members = state.members.length > 0 ? state.members : storage.get('members', []);

            return members.filter(member => ! getters.killed.includes(member.user_id));
        },
        partyMembers(state, getters) {
            return state.party_members || storage.get('party_members', []);
        },
        killed(state, getters) {
            return state.killed;
        },
        userId(state) {
            return state.user_id || parseInt(storage.get('user_id'));
        },
        rounds(state) {
            return state.rounds.length > 0 ? state.rounds : storage.get('rounds', []);
        },
        activeRound(state, getters) {
            let round = getters.rounds[state.active_round];

            if (round != undefined) {
                return round;
            }

            return getters.rounds[storage.get('active_round')];
        },
        channelName(state) {
            return state.channel_name;
        },
        isElected(state, getters) {
            return getters.activeRound.chancellorElected;
        },
        role(state) {
            let role = state.role || storage.get('role');

            if (!role) {
                return null;
            }

            return role.toLowerCase();
        },
        president(state, getters) {
            let members = getters.members;

            if (! getters.activeRound) {
                return null;
            }
            
            let president_id = getters.activeRound.president;

            if (! president_id) {
                return null;
            }

            return members.find(member => member.user_id == president_id);
        },
        chancellor(state, getters) {
            let members = getters.members;
            
            if (! getters.activeRound) {
                return null;
            }

            let chancellor_id = getters.activeRound.chancellor;

            if (! chancellor_id) {
                return null;
            }

            return members.find(member => member.user_id == chancellor_id);
        },

        isCreator(state) {
            let creator = state.members.filter(
                member => member.is_channel_creator
            );

            return creator.length > 0 && creator[0].is_me;
        },

        isPresident(state, getters) {
            if (state.rounds.length === 0) return false;

            return getters.userId == state.rounds[state.active_round].president;
        },

        isChancellor(state, getters) {
            if (state.rounds.length === 0) return false;

            return (
                getters.userId == state.rounds[state.active_round].chancellor
            );
        },
    },
};
