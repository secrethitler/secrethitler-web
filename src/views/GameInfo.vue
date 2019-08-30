<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Policies</h1>
        </div>

        <div class="container">
            <div class="flex flex-col lg:flex-row">
                <div>
                    <h3 class="font-old text-3xl lg:px-4">Liberal</h3>
                    <div class="-mx-4 relative lg:px-8 mb-8 lg:mb-0">
                        <img src="../assets/playfield_liberal_edited.jpg" alt />
                        <transition-group name="policy" class="liberal-policy-container">
                            <div v-for="index in 5" :key="index" class="liberal-policy">
                                <img src="../assets/policy_liberal.jpg" alt />
                            </div>
                        </transition-group>
                    </div>
                </div>

                <div>
                    <h3 class="font-old text-3xl lg:px-4">Fascist</h3>
                    <div class="-mx-4 relative lg:px-8">
                        <img src="../assets/playfield_fascist_1_edited.jpg" alt />
                        <transition-group name="policy" class="fascist-policy-container">
                            <div v-for="index in fascist" :key="index" class="fascist-policy">
                                <img src="../assets/policy_fascist.jpg" alt />
                            </div>
                        </transition-group>
                    </div>
                </div>

                <div v-if="isCreator" class="flex justify-center mt-8">
                    <button class="btn" @click="handleNextRound">Next Round</button>
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
        
        };
    },
    computed: {
        ...mapGetters(['rounds', 'isCreator']),
        policies() {
            return this.rounds.map(round => round.enacted_policy);
        },
        liberal() {
            return this.policies.filter(policy => policy === 'liberal').length;
        },
        fascist() {
            return this.policies.filter(policy => policy === 'fascist').length;
        }
    },

    methods: {
        handleNextRound() {
            this.$http.post('/round/next', {
                channelName: this.$route.params.id
            });
        }
    }
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
        animation-duration: .5s;
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
