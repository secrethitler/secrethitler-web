<template>
    <div>
        <page-title>Election</page-title>
        
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <div class="mb-4">
                    <h3 class="font-serif text-2xl mb-4">{{ chancellor.user_name || '' }} was nominated as chancellor.</h3>
                    <p>
                        Do you accept this nomination?
                    </p>
                </div>
                <div class="pt-6 flex justify-center" :class="{ 'opacity-50': hasVoted, 'pointer-events-none': hasVoted }">
                    <div class="p-6 max-w-xs cursor-pointer border-4 border-transparent" :class="{ 'border-red-700': voted == 'yes' }" @click="vote(true)">
                        <img src="../assets/vote_yes.jpg" alt="">
                    </div>

                    <div class="p-6 max-w-xs cursor-pointer border-4 border-transparent" :class="{ 'border-red-700': voted == 'no' }" @click="vote(false)">
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
            disable: false,
            voted: false,
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
            return this.disable || !! this.activeRound.votes.find(vote => vote.user_id == this.userId);
        }
    },

    methods: {
        
        vote(yes) {
            this.disable = true;
            this.$http.post('/chancellor/vote', {
                channelName: this.$route.params.id,
                chancellorId: this.chancellor.user_id,
                votedYes: yes,
            })
            .then(res => {
                this.voted = yes ? 'yes' : 'no';
            })
            .catch(err => {
                alert(err.message);
                this.disable = false;
            });
        }
    }
}
</script>

<style>

</style>
