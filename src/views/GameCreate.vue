<template>
    <div class="game-create min-h-screen">
        <modal ref="error-modal" name="error-modal">
            <div class="p-4">{{ error }}</div>
        </modal>

        <div class="container font-serif text-white py-4 lg:py-12">
            <h1 class="text-5xl font-bold text-center mb-12">Create a Game</h1>

            <div class="flex flex-wrap -mx-4">
                <div class="px-4 w-full lg:w-1/2 mb-8 lg:order-2">
                    <form
                        ref="form"
                        action="/game/create"
                        method="POST"
                        @submit.prevent="create"
                        class="block w-full"
                    >
                        <div class="mb-8">
                            <ui-label for="user_name">Your Name</ui-label>
                            <ui-input v-model="user_name" id="user_name" type="text" name="user_name" required />
                        </div>
                        <div class="flex justify-end">
                            <button class="btn">Create Game</button>
                        </div>
                    </form>
                </div>
                <div class="px-4 w-full lg:w-1/2 mb-8 lg:order-1">
                    <div class="flex justify-center">
                        <img src="../assets/landingpage/bird.png" alt="Bird" />
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
            error: '',
            user_name: ''
        };
    },

    methods: {
        create() {
            this.$http
                .post('/game/create', {
                    userName: this.user_name
                })
                .then(res => {
                    this.$store.commit('setUserId', res.data.userId);
                    this.$router.push(`/game/${res.data.channelName}/lobby`);
                })
                .catch(err => {
                    this.error = err.message;
                    this.$refs['error-modal'].show();
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.game-create {
    @apply bg-red-600;
}

input {
    @apply text-gray-800 px-2 py-2 rounded shadow border-none;
}
</style>
