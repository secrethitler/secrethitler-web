<template>
    <div>
        <page-title>Eliminate Player</page-title>
        
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <h3 class="font-serif text-2xl mb-4">You have the power to eliminate one player!</h3>
                <p>Select a player which should be killed.</p>

                <div class="mt-8" :class="getClasses">
                    <ul>
                        <li
                            v-for="player in killable"
                            :key="player.user_id"
                            class="py-2 font-serif text-gray-700 cursor-pointer text-xl px-3 bg-white rounded shadow flex justify-between mb-2"
                        >
                            <span>{{ player.user_name }}</span>
                            <button
                                class="py-1 px-2 upeprcase text-sm bg-gray-200 text-gray-700 font-bold rounded tracking-wide hover:bg-red-500 hover:text-yellow-200"
                                @click="eliminate(player.user_id)"
                            >Eliminate</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from '../storage';
import { mapGetters } from 'vuex';

export default {

    data() {
        return {
            eliminating: false
        }
    },

    computed: {
        ...mapGetters(['members', 'userId']),
        killable() {
            return this.members.filter(member => member.user_id != this.userId);
        },
        getClasses() {
            return this.eliminating
                ? ['opacity-50', 'pointer-events-none'] : []
        }
    },

    methods: {
        eliminate(id) {
            this.eliminating = true;
            this.$http.post('/player/execute', {
                channelName: this.$route.params.id,
                userId: parseInt(id),
            })
            .then(res => {
                this.$router.push({name: 'info', params: { id: this.$route.params.id}});
            })
            .catch(err => {
                this.eliminating = false;
            });
        },
    },
};
</script>

<style>
</style>
