<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Discard Policy</h1>
        </div>
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <div class="mb-4">
                    <h3 class="font-serif text-2xl mb-4">Select a policy to discard.</h3>
                    <p>
                        The remaining policy will be enacted.
                    </p>
                </div>

                <div class="flex" :class="{ 'pointer-events-none': discarding, 'opacity-50': discarding }">
                    <div v-for="(policy, index) in policies" :key="index" class="px-2 w-full lg:w-1/2">
                        <div v-if="policy == 'liberal'" @click="discard(policy)">
                            <img src="../assets/policy_liberal.jpg" alt="Liberal Policy">
                        </div>
                        <div v-if="policy == 'fascist'" @click="discard(policy)">
                            <img src="../assets/policy_fascist.jpg" alt="Fascist Policy">
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['data'],

    data() {
        return {
            policies: [],
            discarding: false
        }
    },

    computed: {
        // ...mapGetters(['chancellor', 'members', 'activeRound']),
    },

    methods: {
        discard(policy) {
            this.discarding = true;
            
            this.$http.post('/policy/chancellor-pick', {
                channelName: this.$route.params.id,
                discardedPolicy: policy,
            }).then(res => {
                this.$router.push({name: 'info', params: { id: this.$route.params.id}});
            });
        }
    },

    created() {
        this.policies = this.data.policies;
    }
}
</script>

<style>

</style>
