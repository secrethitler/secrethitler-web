<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Policies</h1>
        </div>

        <div class="container">
            <!-- President and Chancellor -->
            <div class="flex justify-center -mx-4 mb-8 border-b pb-4 border-gray-400">
                <div class="px-4 flex justify-start flex-col items-center max-w-sm">
                    <img src="../assets/president.jpg" alt class="mb-4" />
                    <span
                        v-if="president"
                        class="font-serif text-xl text-center bg-white py-2 px-4 rounded shadow border-2 border-red-500"
                    >{{ president.user_name }}</span>
                </div>
                <div class="px-4 flex justify-start flex-col items-center max-w-sm">
                    <img src="../assets/chancellor.jpg" alt class="mb-4" />
                    <span
                        v-if="chancellor"
                        class="font-serif text-xl text-center bg-white py-2 px-4 rounded shadow border-2 border-yellow-400"
                    >{{ chancellor.user_name }}</span>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row">
                <!-- Liberal Policies -->
                <div>
                    <div class="-mx-4 relative lg:px-8 mb-8 lg:mb-0">
                        <img src="../assets/playfield_liberal_edited.jpg" alt />
                        <transition-group name="policy" class="liberal-policy-container">
                            <div v-for="index in liberal" :key="index" class="liberal-policy">
                                <img src="../assets/policy_liberal.jpg" alt />
                            </div>
                        </transition-group>
                    </div>
                </div>

                <!-- Facist Policies -->
                <div>
                    <div class="-mx-4 relative lg:px-8">
                        <img src="../assets/playfield_fascist_1_edited.jpg" alt />
                        <transition-group name="policy" class="fascist-policy-container">
                            <div v-for="index in fascist" :key="index" class="fascist-policy">
                                <img src="../assets/policy_fascist.jpg" alt />
                            </div>
                        </transition-group>
                    </div>
                </div>

            </div>

            <div class="flex justify-center mt-8">
                <ShowRole :role="role" />
            </div>

            <div v-if="isCreator" class="flex justify-center mt-8">
                <button
                    class="btn px-8 border-2 border-red-600 shadow"
                    @click="handleNextRound"
                >Next Round</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ShowRole from '../components/ShowRole.vue';

export default {
    components: {
        ShowRole
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['rounds', 'isCreator', 'president', 'chancellor', 'role', 'role']),
        policies() {
            return this.rounds.map(round => round.enacted_policy);
        },
        liberal() {
            return this.policies.filter(policy => policy === 'liberal').length;
        },
        fascist() {
            return this.policies.filter(policy => policy === 'fascist').length;
        },
    },

    methods: {
        handleNextRound() {
            this.$http.post('/round/next', {
                channelName: this.$route.params.id,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.fascist-policy-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0 6%;
    display: flex;
    align-items: center;

    @screen lg {
        padding: 0 11%;
    }
}

.fascist-policy {
    width: 16.6666%;
    padding: 0 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @screen md {
        padding: 0 13px;
    }

    @screen lg {
        padding: 0 6px;
    }

    img {
        @apply block;
    }
}

.liberal-policy-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0 6%;
    display: flex;
    align-items: center;

    @screen lg {
        padding: 0 12%;
    }
}

.liberal-policy {
    width: 20%;
    padding: 0 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @screen md {
        padding: 0 13px;
    }

    @screen lg {
        padding: 0 7px;
    }

    img {
        @apply block;
    }
}

.policy-enter-active {
    transition: all 0.3s ease;

    img {
        animation-name: glow;
        animation-iteration-count: 1;
        animation-duration: 0.5s;
        animation-timing-function: ease;
    }
}

.policy-enter {
    opacity: 0;
    transform: translateY(50%);
}

.policy-enter-to {
    opacity: 1;
    transform: translateY(0);
}

@keyframes glow {
    0% {
        box-shadow: 0 0 32px rgba(255, 255, 255, 0);
    }

    50% {
        box-shadow: 0 0 32px rgba(255, 255, 255, 1);
    }

    100% {
        box-shadow: 0 0 32px rgba(255, 255, 255, 0);
    }
}
</style>
