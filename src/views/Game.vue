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
        ...mapGetters(['connections', 'members', 'userId', 'isPresident', 'channelName']),
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
            )
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
            this.connetions.private.bind(
                'policy_peek',
                this.handlePolicyPeek
            )
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
            this.setNewPresident(e.president_id);
        },
        handleNotifyPresident(e) {
            this.data = e;
            this.$router.push({ name: 'nominate', params: {id: this.$route.params.id}});
        },
        handleChancellorNominated(e) {
            this.setNominatedChancellor(e.chancellor_id);
            this.$router.push({ name: 'vote', params: {id: this.$route.params.id} })
        },
        handleChancellorVote(e) {
            this.addChancellorVote(e);
        },
        handleChancellorElected(e) {
            this.$store.commit('setElected', e.elected);
            if (! this.isPresident || ! e.elected) {
                this.data = e;
                this.$router.push({name: 'vote-result', params: { id: this.$route.params.id}});
            }
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
        }
    },

    created() {
        this.subscribeToChannels();
        this.registerListener();
        console.log(this.$store.state);
    },

    beforeDestroy() {
        this.$store.commit('resetGame');
    },
};
</script>
