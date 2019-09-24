<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Investigate Player</h1>
        </div>
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <h3 class="font-serif text-2xl mb-4">You can investigate a player!</h3>
                <p>Select a player to investigate. You will find out his/her party membership.</p>

                <div v-if="investigating == false" class="mt-8">
                    <ul>
                        <li
                            v-for="player in investigateable"
                            :key="player.user_id"
                            class="py-2 font-serif text-gray-700 cursor-pointer text-xl px-3 bg-white rounded shadow flex justify-between mb-2"
                        >
                            <span>{{ player.user_name }}</span>
                            <button
                                class="py-1 px-2 upeprcase text-sm bg-gray-200 text-gray-700 font-bold rounded tracking-wide hover:bg-red-500 hover:text-yellow-200"
                                @click="investigate(player.user_id)"
                            >Investigate</button>
                        </li>
                    </ul>
                </div>

                <div v-if="investigating && this.membership != ''">
                    <div class="flex justify-center py-12">
                        <div class="max-w-xl">
                            <img
                                v-if="membership == 'liberal'"
                                src="../assets/membership_liberal.jpg"
                                alt="Liberal Membership"
                            />
                            <img
                                v-if="membership == 'fascist'"
                                src="../assets/membership_fascist.jpg"
                                alt="Fascist Membership"
                            />
                        </div>
                    </div>

                    <div class="flex justify-center py-4">
                        <router-link
                            class="btn shadow"
                            :to="{ name: 'info', params: { id: $route.params.id } }"
                        >Back</router-link>
                    </div>
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
            investigating: false,
            membership: '',
        };
    },

    computed: {
        ...mapGetters(['members', 'userId']),
        investigateable() {
            return this.members.filter(member => member.user_id != this.userId);
        },
    },

    methods: {
        investigate(id) {
            this.investigating = true;
            this.$http
                .get(`/player/investigate/${id}`, {
                    params: {
                        channelName: this.$route.params.id,
                    },
                    data: {},
                })
                .then(res => {
                    this.membership = res.data.party;
                })
                .catch(err => {
                    alert(err.message);
                    this.investigating = false;
                });
        },
    },
};
</script>

<style>
</style>
