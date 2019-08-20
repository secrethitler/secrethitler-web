<template>
    <div>
        <h2>Enacted Policies</h2>
        <div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['rounds']),
        policies() {
            return this.rounds.map(round => round.enacted_policy);
        },
        liberal() {
            return this.policies.filter(policy => policy === 'liberal').length;
        },
        fascist() {
            return this.policies.filter(policy => policy === 'fascist').length;
        }
    }
}
</script>
