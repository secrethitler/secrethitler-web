<template>
    <div class="game">
        <router-view></router-view>

        <modal name="new_president" ref="new_president">
            <NewPresident />
        </modal>

        <modal name="chancellor_nominated" ref="chancellor_nominated">

        </modal>
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
            'setUserId',
            'setMembers',
            'setNewRound',
            'setNewPresident',
            'setNominatedChancellor',
            'addChancellorVote',
        ]),
        subscribeToChannels() {
            this.setChannelName(this.$route.params.id);
            this.setPresence(this.$pusher.subscribe(`presence-${this.$route.params.id}`));
            this.setChannel(this.$pusher.subscribe(this.$route.params.id));
            this.setPrivate(this.$pusher.subscribe(`private-${this.userId}`));
        },
        registerListener() {
            this.connections.presence.bind(
                'pusher:subscription_succeeded',
                this.handleSubscriptionSucceeded
            );
            this.connections.presence.bind(
                'pusher:member_added',
                this.handleMemberAdded
            );
            this.connections.presence.bind(
                'pusher:member_removed',
                this.handleMemberRemoved
            );
            this.connections.private.bind(
                'game_start',
                this.handleGameStart
            );
            this.connections.channel.bind(
                'next_round',
                this.handleNextRound
            );
            this.connections.private.bind('notify_president', this.handleNotifyPresident);
            this.connections.channel.bind(
                'chancellor_nominated',
                this.handleChancellorNominated
            );
            this.connections.channel.bind(
                'chancellor_vote',
                this.handleChancellorVote
            );
        },
        handleSubscriptionSucceeded(e) {
            let members = [];

            for (let id in e.members) {
                members.push({
                    user_id: id,
                    is_me: id == e.myID,
                    ...e.members[id]
                });
            }

            this.setMembers(members);
            this.setUserId(e.myID);
        },
        handleMemberAdded(member) {
            this.$store.commit('addMember', member);
        },
        handleMemberRemoved(member) {
            this.$store.commit('removeMember', member);
        },
        handleGameStart(e) {
            this.resetGame();
            this.$store.commit('startGame', e);

            this.$router.push({name: 'info', params: { id: this.$route.params.id}});
        },
        handleNextRound(e) {
            this.setNewRound();
            this.setNewPresident(e.president_id);
        },
        handleNotifyPresident(e) {
            this.$refs.new_president.show();
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
        this.subscribeToChannels();
        this.registerListener();
    },

    beforeDestroy() {
        this.$store.commit('resetGame');
    },
};
</script>

<style>

</style>
