<template>
    <div>
        <h2>{{ $route.params.id }}</h2>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            channel: null,
            presence: null,
            private: null
        }
    },

    methods: {
        subscribeToChannels() {
            this.channel = this.$pusher.subscribe(
                this.$route.params.id
            );

            this.channel.bind('test_event', (e) => {
                console.log(e);
            });

            // this.presence = this.$pusher.subscribe(
            //     `presence-${this.$route.params.id}`
            // );
        },
        registerListener() {

        }
    },

    created() {
        this.subscribeToChannels();
    }
}
</script>
