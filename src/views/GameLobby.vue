<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-8 mb-8 bg-red-600">
            <h1 class="text-5xl font-bold text-center">Lobby</h1>
        </div>

        <div class="container">
            <div class="flex flex-wrap justify-start items-center mb-8">
                <h3 class="font-serif text-2xl mb-2 mr-4">Invite your friends:</h3>
                <div class="w-full lg:w-auto font-mono text-sm md:text-base lg:text-lg text-gray-700 px-3 py-2 bg-gray-200 select-all rounded">
                    {{ link }}
                </div>
            </div>
            <div>
                <h3 class="font-serif text-2xl mb-2 mr-4">Players:</h3>
                <ul>
                    <li v-for="member in members" :key="member.user_id">
                        {{ member.channel_info.user_name }}
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
        ...mapGetters(['members']),
        link() {
            return `${window.location.protocol}//${window.location.host}/game/join?lobby=${this.$route.params.id}`;
        }
    }
};
</script>

<style>

</style>
