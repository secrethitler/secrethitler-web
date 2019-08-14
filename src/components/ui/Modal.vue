<template>
    <transition name="modal">
        <div v-if="open" class="modal" :class="{ 'modal-open': open }">
            <div ref="modal" class="modal-inner container">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },

    methods: {
        show() {
            this.open = true;
            window.addEventListener('click', this.handleClick);
        },
        close() {
            this.open = false;
            window.removeEventListener('click', this.handleClick);
        },
        handleClick(e) {
            if (e.target != this.$refs.modal) {
                this.close();
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.modal {
    @apply fixed inset-0 h-full w-full flex items-center justify-center p-4 z-50 pointer-events-none;
    background-color: rgba(0, 0, 0, 0.5);

    &.modal-open {
        @apply pointer-events-auto;

        .modal-inner {
            transform: translateY(0);
        }
    }

    .modal-inner {
        transition: all .3s ease;
        transform: translateY(-5rem);
        @apply block w-full rounded-lg p-4 shadow-lg bg-white;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: all .3s ease;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-to,
.modal-leave {
    opacity: 1;
}

</style>
