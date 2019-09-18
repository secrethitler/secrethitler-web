<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Election Result</h1>
        </div>
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <!-- <h3 class="font-serif text-2xl mb-4">You are the new President!</h3> -->
                <!-- <p>Select a player you would like to nominate as chancellor.</p> -->

                <div class="mt-8">
                    <ul>
                        <li
                            v-for="member in members"
                            :key="member.user_id"
                            class="py-2 font-serif text-gray-700 cursor-pointer text-xl px-3 bg-white rounded shadow flex justify-between mb-2"
                        >
                            <span>{{ member.user_name }}</span>
                            <div class="vote-indicator" :class="{ 'vote-yes': getVoteForId(member.user_id), 'vote-no': ! getVoteForId(member.user_id) }"></div>
                        </li>
                    </ul>
                </div>

                <div class="flex justify-center py-4">
                    <router-link class="cta shadow" :to="{ name: 'info', params: { id: $route.params.id } }">Back</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        data: {
            required: true,
        },
    },

    data() {
        return {
            result: []
        }
    },

    computed: {
        ...mapGetters(['members', 'activeRound', 'channelName'])
    },

    methods: {
        getVoteForId(id) {
            console.log(this.activeRound.votes);
            console.log(id);
            let vote = this.activeRound.votes.find(vote => vote.user_id == id);

            console.log(vote);

            return vote.voted_yes || false;
        }
    },

    created() {
        if (this.data) {
            localStorage.setItem('vote-result', this.data);
        }

        this.result = this.data || localStorage.getItem('vote-result');
    }
};
</script>

<style lang="scss" scoped>

.vote-indicator {
    width: 4rem;
    @apply rounded;

    &.vote-yes {
        @apply bg-green-500;
    }

    &.vote-no {
        @apply bg-red-500;
    }
}

</style>
