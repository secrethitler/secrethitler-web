<template>
    <div class="game">
        <router-view></router-view>

        <modal name="new_president" ref="new_president">
            <NewPresident />
        </modal>

        <modal name="chancellor_nominated" ref="chancellor_nominated"></modal>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NewPresident from '../components/NewPresident.vue';

export default {
    components: {
        NewPresident,
    },

    data() {
        return {};
    },

    computed: {
        ...mapGetters(['connections', 'members', 'userId']),
    },

    methods: {
        // channels
        ...mapMutations(['setChannelName', 'setChannel', 'setPresence', 'setPrivate']),
        // game
        ...mapMutations([
            'resetGame',
            'setMembers',
            'setNewRound',
            'setPresident',
            'setNominatedChancellor',
            'addChancellorVote',
        ]),
        subscribeToChannels() {
            this.setChannelName(this.$route.params.id);
            this.setChannel(this.$pusher.subscribe(this.$route.params.id));
            this.setPresence(this.$pusher.subscribe(`presence-${this.$route.params.id}`));
            this.setPrivate(this.$pusher.subscribe(`private-${this.userId}`));
        },
        registerListener() {
            this.connections.presence.bind(
                'pusher:subscription_succeeded',
                this.handleSubscriptionSucceeded
            );
            this.connections.private.bind(
                'game_start',
                this.handleGameStart
            );
            this.connections.channel.bind(
                'new_president',
                this.handleNewPresident
            );
            this.connections.channel.bind(
                'chancellor_nominated',
                this.handleChancellorNominated
            );
            this.connections.channel.bind(
                'chancellor_vote',
                this.handleChancellorVote
            );
        },
        handleSubscriptionSucceeded(members) {
            let newMembers = [];

            for (let id in members.members) {
                newMembers.push({
                    user_id: id,
                    is_me: id === this.userId, 
                    ...members.members[id]
                });
            }

            console.log(members);

            this.setMembers(newMembers);
        },
        handleGameStart(e) {
            this.resetGame();
        },
        handleNewPresident(e) {
            this.setNewRound();
            this.setPresident(e.president_id);
        },
        handleChancellorNominated(e) {
            this.setNominatedChancellor(e.chancellor_id);
            this.$refs.chancellor_nominated.show();
        },
        handleChancellorVote(e) {
            this.addChancellorVote(e);
        },
    },

    created() {
        this.startLoading();

        this.subscribeToChannels();
        this.registerListener();

        this.stopLoading();
    },

    beforeDestroy() {
        this.$store.commit('resetGame');
    },
};
</script>

<style>

</style>
