<template>
    <div class="game-join min-h-screen">

        <modal ref="error-modal">
            <div class="p-4">
                I can be clicked??
            </div>
        </modal>

        <div class="container font-serif text-white py-4 lg:py-12">
            <h1 class="text-5xl font-bold text-center mb-12">Join a Lobby</h1>

            <div class="flex flex-wrap -mx-4">
                <div class="px-4 w-full lg:w-1/2 mb-8 lg:order-2">
                    <form ref="form" action="/game/join" method="POST" @submit.prevent="join" class="block w-full">
                        <div class="mb-6">
                            <ui-label for="user_name">Your Name</ui-label>
                            <ui-input id="user_name" type="text" name="user_name" required />
                        </div>
                        <div class="mb-8">
                            <ui-label for="channel_name">Lobby ID</ui-label>
                            <ui-input id="channel_name" type="text" name="channel_name" required v-model="channel_name" />
                        </div>
                        <div class="flex justify-end">
                            <button class="btn">
                                Join Lobby
                            </button>
                        </div>
                    </form>
                </div>
                <div class="px-4 w-full lg:w-1/2 mb-8 lg:order-1">
                    <div class="flex justify-center">
                        <img src="../assets/landingpage/bird.png" alt="Bird">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            channel_name: ''
        }
    },

    methods: {
        join() {
            this.$http.post('/game/join', new FormData(this.$refs.form))
                .then(res => {
                    this.$store.commit('setUserId', res.data.user_id);
                    this.$router.push(`/game/${this.channel_name}/lobby`);
                })
                .catch(err => {
                    this.$refs['error-modal'].show();
                });
        }
    },

    created() {
        this.channel_name = this.$route.query.lobby;
    }
}
</script>

<style lang="scss" scoped>
    .game-join {
        @apply bg-red-600;
    }

    input {
        @apply text-gray-800 px-2 py-2 rounded shadow border-none;
    }
</style>
