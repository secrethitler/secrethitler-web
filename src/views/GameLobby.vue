<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Lobby</h1>
        </div>

        <div class="container">
            <div class="flex flex-wrap justify-start items-center mb-8">
                <h3 class="w-full md:w-auto font-serif text-2xl mb-2 mr-4">Invite your friends:</h3>
                <div class="flex flex-1 w-full md:w-auto">
                    <input
                        ref="link"
                        class="w-full lg:w-auto font-mono text-sm md:text-base lg:text-lg text-gray-700 px-3 py-2 bg-gray-200 select-all rounded flex-1"
                        :value="link"
                        readonly
                    />
                    <div>
                        <button
                            class="h-full flex items-center bg-red-600 py-2 px-4 text-center text-white font-bold tracking-wide uppercase leading-none"
                            @click="copyToClipboard"
                        >Copy</button>
                    </div>
                </div>
            </div>
            <div v-if="members.length > 0">
                <h3 class="font-serif text-2xl mb-2 mr-4">Players:</h3>
                <ul class="bg-white p-4 rounded shadow-lg">
                    <li
                        v-for="member in members"
                        :key="member.user_id"
                        class="flex items-center py-2 border-b border-gray-300 text-lg font-serif"
                    >
                        {{ member.user_name }}
                        <span v-if="member.user_id == userId" class="ml-2 bg-red-600 text-white uppercase font-bold text-serif p-2 text-xs">
                            YOU
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['members', 'userId']),
        link() {
            return `${window.location.protocol}//${window.location.host}/game/join?lobby=${this.$route.params.id}`;
        },
    },

    methods: {
        copyToClipboard() {
            this.$refs.link.select();

            document.execCommand('copy');
        },
    },

    created() {
        this.$emit('joinedLobby');
    }
};
</script>

<style>
</style>
