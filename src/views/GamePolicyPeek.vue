<template>
    <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Policy Peek</h1>
        </div>
        <div class="container flex justify-center">
            <div class="lg:w-1/2">
                <h3 class="font-serif text-2xl mb-4">You may look at the top 3 policies from the card pile!</h3>

                <div v-if="policies.length == 0 && showing == false" class="flex justify-center">
                    <button class="btn" @click="getPeekedPolicies">Show Policies</button>
                </div>

                <div v-if="policies.length > 0" class="flex">
                    <div v-for="(policy, index) in policies" :key="index" class="px-2 w-full lg:w-1/3 mb-4">
                        <div v-if="policy == 'liberal'">
                            <img src="../assets/policy_liberal.jpg" alt="Liberal Policy">
                        </div>
                        <div v-if="policy == 'fascist'">
                            <img src="../assets/policy_fascist.jpg" alt="Fascist Policy">
                        </div>
                    </div>
                </div>

                <div v-if="policies.length > 0" class="flex justify-center py-4">
                    <router-link class="btn shadow" :to="{ name: 'info', params: { id: $route.params.id } }">Back</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {
            showing: false,
            policies: []
        }
    },

    methods: {
        getPeekedPolicies() {
            this.showing = true;
            this.$http.get('/policy/peek', {
                params: { channelName: this.$route.params.id }
            })
            .then(res => {
                this.policies = res.data.policies;
            })
            .catch(err => {
                alert(err.message);
                this.showing = false;
            });
        }
    }
}
</script>

<style>

</style>
