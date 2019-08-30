<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="getViewBox" :class="getClass">
        <path :d="getPath" />
    </svg>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
        }
    },
    computed: {
        getIcon() {
            let icons = {
                'crown': require('@fortawesome/free-solid-svg-icons/faCrown')
            };

            return icons[this.icon];
        },
        getViewBox() {
            return `0 0 ${this.getIcon.width} ${this.getIcon.height}`;
        },
        getPath() {
            return this.getIcon.svgPathData;
        },
        getClass() {
            return [
                'icon',
                `icon-${this.icon}`
            ];
        }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    @apply fill-current;
    width: 1em;
}
</style>

