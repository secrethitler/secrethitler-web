<template>
    <div>
        <page-title>Nominate</page-title>
        
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <h3 class="font-serif text-2xl mb-4">You are the new President!</h3>
                <p>Select a player you would like to nominate as chancellor.</p>

                <div class="mt-8">
                    <ul>
                        <li
                            v-for="player_id in data.electable"
                            :key="player_id"
                            class="py-2 font-serif text-gray-700 cursor-pointer text-xl px-3 bg-white rounded shadow flex justify-between mb-2"
                        >
                            <span>{{ getUserNameFromId(player_id) }}</span>
                            <button
                                class="py-1 px-2 upeprcase text-sm bg-gray-200 text-gray-700 font-bold rounded tracking-wide hover:bg-red-500 hover:text-yellow-200"
                                @click="nominate(player_id)"
                            >Nominate</button>
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
            electable: []
        }
    },

    methods: {
        nominate(id) {
            this.$http.post('/chancellor/nominate', {
                channelName: this.$route.params.id,
                chancellorId: id,
            });
        },
    },

    created() {
        if (this.data) {
            storage.set('electable', this.data);
        }

        this.electable = this.data || storage.get('electable', []);
    }
};
</script>

<style>
</style>
