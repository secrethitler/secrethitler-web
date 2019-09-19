<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Election</h1>
        </div>
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <div class="mb-4">
                    <h3 class="font-serif text-2xl mb-4">{{ chancellor.user_name || '' }} was nominated as chancellor.</h3>
                    <p>
                        Do accept this nomination?
                    </p>
                </div>
                <div class="pt-6 flex justify-center" :class="{ 'opacity-50': hasVoted, 'pointer-events-none': hasVoted }">
                    <div class="px-8 max-w-xs cursor-pointer" @click="vote(true)">
                        <img src="../assets/vote_yes.jpg" alt="">
                    </div>

                    <div class="px-8 max-w-xs cursor-pointer" @click="vote(false)">
                        <img src="../assets/vote_no.jpg" alt="">
                    </div>
                </div>

                <div class="pt-8 text-center font-old text-4xl text-gray-700">
                    {{ count }} / {{ members.length }} have voted.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            voted: false
        }
    },

    computed: {
        ...mapGetters(['chancellor', 'members', 'activeRound', 'userId']),
        count() {
            return this.activeRound.votes.length;
        },
        hasFinished() {
            return this.count === this.members.length;
        },
        hasVoted() {
            return this.voted || !! this.activeRound.votes.find(vote => vote.user_id == this.userId);
        }
    },

    methods: {
        
        vote(yes) {
            this.voted = true;
            this.$http.post('/chancellor/vote', {
                channelName: this.$route.params.id,
                chancellorId: this.chancellor.user_id,
                votedYes: yes,
            });
        }
    }
}
</script>

<style>

</style>
