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
                    <form ref="form" action="/join" method="POST" @submit.prevent="join" class="block w-full">
                        <div class="mb-6">
                            <ui-label for="username">Your Name</ui-label>
                            <ui-input id="username" type="text" name="username" required />
                        </div>
                        <div class="mb-8">
                            <ui-label for="lobby">Lobby ID</ui-label>
                            <ui-input id="lobby" type="text" name="lobby" required v-model="lobby" />
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
            lobby: ''
        }
    },

    methods: {
        join() {
            this.$http.post('/join', new FormData(this.$refs.form))
                .then(res => {
                    this.$router.push(`/game/${this.lobby}/lobby`);
                })
                .catch(err => {
                    this.$refs['error-modal'].show();
                });
        }
    },

    created() {
        this.lobby = this.$route.query.lobby;
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
