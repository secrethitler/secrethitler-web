import Vue from 'vue';
import Vuex from 'vuex';

import channels from './channels';
import game from './game';
import modal from './modal';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        channels,
        game,
        modal
    }
});
