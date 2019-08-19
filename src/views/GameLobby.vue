<template>
    <div>
        <div class="container font-serif text-white py-4 lg:py-12">
            <h1 class="text-5xl font-bold text-center mb-12">Lobby</h1>

            <div>
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
    }
};
</script>

<style>
</style>
