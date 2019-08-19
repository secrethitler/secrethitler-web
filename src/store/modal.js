export default {
    state: {
        active_modal: null,
    },

    mutations: {
        setActiveModal(state, modal) {
            state.active_modal = modal;
        }
    },

    getters: {
        activeModal(state) {
            return state.active_modal;
        }
    }
}
