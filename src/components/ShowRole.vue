<template>
    <div>

        <button
            @mousedown="show"
            @touchstart="show"
            @mouseup="hide"
            @touchend="hide"
            class="text-center font-serif py-2 px-3 bg-white rounded shadow border border-red-500"
        >
            Hold to show role
        </button>

        <modal name="role" ref="modal">
            <div class="flex justify-center">
                <img v-if="role == 'fascist'" src="../assets/role_fascist.jpg" alt="Fascist">
                <img v-if="role == 'liberal'" src="../assets/role_liberal.jpg" alt="Liberal">
                <img v-if="role == 'hitler'" src="../assets/role_hitler.jpg" alt="Hitler">
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    props: ['role'],

    methods: {
        show() {
            this.$refs.modal.show();
        },

        hide() {
            this.$refs.modal.close();
        }
    }
}
</script>

<style>

</style>
