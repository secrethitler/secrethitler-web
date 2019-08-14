import http from './http';
import pusher from './pusher';

let installBaseProperties = Vue => {
    Vue.prototype.$http = http;
    Vue.prototype.$pusher = pusher;
};

let installUiComponents = Vue => {
    Vue.component('ui-label', require('./components/ui/Label.vue').default);
    Vue.component('ui-input', require('./components/ui/Input.vue').default);
    Vue.component('modal', require('./components/ui/Modal.vue').default);
};

export default {
    install(Vue) {
        installBaseProperties(Vue);
        installUiComponents(Vue);
    },
};
