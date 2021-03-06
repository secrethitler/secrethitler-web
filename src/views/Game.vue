<template>
    <div class="game pb-8">
        <router-view :data="data"></router-view>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {

    data() {
        return {
            data: {},
            loadChannels: false
        };
    },

    computed: {
        ...mapGetters(['connections', 'members', 'userId', 'isPresident', 'channelName', 'isKilled']),
    },

    methods: {
        // channels
        ...mapMutations(['setChannelName', 'setChannel', 'setPresence', 'setPrivate']),
        // game
        ...mapMutations([
            'resetGame',
            'setUserId',
            'setMembers',
            'setNewRound',
            'setNewPresident',
            'setNominatedChancellor',
            'addChancellorVote',
            'setEnactedPolicy'
        ]),
        subscribeToChannels() {
            this.loadChannels = true;
            this.setChannelName(this.$route.params.id);
            this.setPresence(this.$pusher.subscribe(`presence-${this.$route.params.id}`));
            this.setChannel(this.$pusher.subscribe(this.$route.params.id));
            this.setPrivate(this.$pusher.subscribe(`private-${this.userId}`));
            this.loadChannels = false;
        },
        registerListener() {
            this.connections.presence.bind(
                'pusher:subscription_succeeded',
                this.updateMembers
            );
            this.connections.presence.bind(
                'pusher:member_added',
                this.updateMembers
            );
            this.connections.presence.bind(
                'pusher:member_removed',
                this.updateMembers
            );
            this.connections.private.bind(
                'game_start',
                this.handleGameStart
            );
            this.connections.channel.bind(
                'next_round',
                this.handleNextRound
            );
            this.connections.private.bind(
                'notify_president',
                this.handleNotifyPresident
            );
            this.connections.channel.bind(
                'chancellor_nominated',
                this.handleChancellorNominated
            );
            this.connections.channel.bind(
                'chancellor_vote',
                this.handleChancellorVote
            );
            this.connections.channel.bind(
                'chancellor_elected',
                this.handleChancellorElected
            );
            this.connections.channel.bind(
                'election_tracker',
                this.handleElectionTracker
            );
            this.connections.private.bind(
                'president_receive_policies',
                this.handlePresidentReceivePolicies
            );
            this.connections.private.bind(
                'chancellor_receive_policies',
                this.handleChancellorReceivePolicies
            );
            this.connections.channel.bind(
                'policy_enacted',
                this.handlePolicyEnacted
            );
            this.connections.channel.bind(
                'game_won',
                this.handleGameWon
            );
            // Special Powers (Kann - Kriterien)
            this.connections.private.bind(
                'execute_player',
                this.handleExecutePlayer
            );
            this.connections.private.bind(
                'policy_peek',
                this.handlePolicyPeek
            );
            this.connections.channel.bind(
                'player_killed',
                this.handlePlayerKilled
            );
            this.connections.private.bind(
                'loyalty_investigation',
                this.handleLoyaltyInvestigation
            );
            this.connections.private.bind(
                'special_election',
                this.handleSpecialElection
            );
        },
        updateMembers() {
            let data = this.connections.presence.members;

            this.setUserId(data.myID);

            let members = [];

            for (let id in data.members) {
                members.push({
                    user_id: id,
                    is_me: id == data.myID,
                    ...data.members[id]
                });
            }

            this.setMembers(members);
        },
        handleGameStart(e) {
            this.resetGame();
            this.$store.commit('startGame', e);

            this.$router.push({name: 'info', params: { id: this.$route.params.id}});
        },
        handleNextRound(e) {
            this.data = {};
            this.setNewRound();
            this.setNewPresident(e.presidentId);
        },
        handleNotifyPresident(e) {
            this.data = e;
            this.$router.push({ name: 'nominate', params: {id: this.$route.params.id}});
        },
        handleChancellorNominated(e) {
            this.setNominatedChancellor(e.chancellorId);
            if (! this.isKilled) {
                this.$router.push({ name: 'vote', params: {id: this.$route.params.id} })
            }
        },
        handleChancellorVote(e) {
            this.addChancellorVote(e);
        },
        handleChancellorElected(e) {
            this.$store.commit('setElected', e.elected);

            if (! e.elected) {
                this.$store.commit('incrementElectionTracker');
            }

            if (! this.isPresident || ! e.elected) {
                this.data = e;
                this.$router.push({name: 'vote-result', params: { id: this.$route.params.id}});
            }
        },
        handleElectionTracker(e) {
            this.$store.commit('resetElectionTracker');
        },
        handlePresidentReceivePolicies(e) {
            this.data = e;
            this.$router.push({name: 'president-select-policy', params: { id: this.$route.params.id}})
        },
        handleChancellorReceivePolicies(e) {
            this.data = e;
            this.$router.push({name: 'chancellor-select-policy', params: { id: this.$route.params.id}})
        },
        handlePolicyEnacted(e) {
            this.setEnactedPolicy(e.policy);
        },
        handleGameWon(e) {
            this.data = e;
            this.$router.push({ name: 'game-over', params: { id: this.$route.params.id } });
        },
        handleExecutePlayer(e) {
            this.data = e;
            this.$router.push({ name: 'eliminate-player', params: { id: this.$route.params.id } });
        },
        handlePolicyPeek(e) {
            this.data = e;
            this.$router.push({ name: 'policy-peek', params: { id: this.$route.params.id } });
        },
        handlePlayerKilled(e) {
            this.$store.commit('killPlayer', e.userId);

            if (e.userId == this.userId) {
                this.$router.push({ name: 'is-eliminated',  params: { id: this.$route.params.id } })
            }
        },
        handleLoyaltyInvestigation(e) {
            this.$router.push({ name: 'investigate', params: { id: this.$route.params.id } });
        },
        handleSpecialElection(e) {
            this.$router.push({ name: 'special-election', params: { id: this.$route.params.id } })
        }
    },

    created() {
        this.subscribeToChannels();
        this.registerListener();
    },

    beforeDestroy() {
        this.$store.commit('resetGame');
    },
};
</script>
