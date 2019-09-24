<template>
    <div>
        <page-title>Special Election</page-title>

        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <h3 class="font-serif text-2xl mb-4">You can propose the next president directly!</h3>

                <div v-if="electing == false" class="mt-8">
                    <ul>
                        <li
                            v-for="player in electable"
                            :key="player.user_id"
                            class="py-2 font-serif text-gray-700 cursor-pointer text-xl px-3 bg-white rounded shadow flex justify-between mb-2"
                        >
                            <span>{{ player.user_name }}</span>
                            <button
                                class="py-1 px-2 upeprcase text-sm bg-gray-200 text-gray-700 font-bold rounded tracking-wide hover:bg-red-500 hover:text-yellow-200"
                                @click="elect(player.user_id)"
                            >Elect as President</button>
                        </li>
                    </ul>
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
            electing: false
        }
    },

    computed: {
        ...mapGetters(['members', 'userId']),
        electable() {
            return this.members.filter(member => member.user_id != this.userId);
        },
    },

    methods: {
        elect(id) {
            this.electing = true;
            this.$http.post('/round/special-election', {
                channelName: this.$route.params.id,
                nextPresidentId: parseInt(id),
            })
            .then(res => {
                this.$router.push({name: 'info', params: { id: this.$route.params.id}});
            })
            .catch(err => {
                this.electing = false;
            });
        }
    }
}
</script>

<style>

</style>
