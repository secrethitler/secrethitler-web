<template>
    <label v-bind="$attrs">
        <slot></slot>
    </label>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
    label {
        @apply block mb-2 tracking-wide text-white uppercase text-lg font-bold;
    }
</style>
