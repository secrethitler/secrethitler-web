<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Eliminate Player</h1>
        </div>
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <h3 class="font-serif text-2xl mb-4">You have the power to eliminate one player!</h3>
                <p>Select a player which should be killed.</p>

                <div class="mt-8" :class="getClasses">
                    <ul>
                        <li
                            v-for="player_id in data.killable"
                            :key="player_id"
                            class="py-2 font-serif text-gray-700 cursor-pointer text-xl px-3 bg-white rounded shadow flex justify-between mb-2"
                        >
                            <span>{{ getUserNameFromId(player_id) }}</span>
                            <button
                                class="py-1 px-2 upeprcase text-sm bg-gray-200 text-gray-700 font-bold rounded tracking-wide hover:bg-red-500 hover:text-yellow-200"
                                @click="eliminate(player_id)"
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

export default {
    props: {
        data: {
            required: true,
        },
    },

    data() {
        return {
            killable: [],
            eliminating: false
        }
    },

    computed: {
        getClasses() {
            return this.eliminating
                ? ['opacity-50', 'pointer-events-none'] : []
        }
    },

    methods: {
        eliminate(id) {
            this.eliminating = true;
            this.$http.post('/player/eliminate', {
                channelName: this.$route.params.id,
                userId: id,
            })
            .then(res => {
                this.$router.push({name: 'info', params: { id: this.$route.params.id}});
            })
            .catch(err => {
                this.eliminating = false;
            });
        },
    },

    created() {
        if (this.data) {
            storage.set('killable', this.data);
        }

        this.killable = this.data || storage.get('killable', []);
    }
};
</script>

<style>
</style>
