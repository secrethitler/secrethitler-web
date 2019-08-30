import http from './http';
import pusher from './pusher';
import nprogress from 'nprogress';
import store from './store/index';

const formToJson = (form) => {
    let object = formToObject(form);

    return JSON.stringify(object);
}

const formToObject = (form) => {
    let formData = new FormData(form);
    let object = {};

    formData.forEach((value, key) => {
        object[key] = value;
    });

    return object;
}

let installBaseMixin = Vue => {
    Vue.mixin({
        methods: {
            startLoading() {
                nprogress.start();
            },
            stopLoading() {
                nprogress.done();
            },
            formToJson: formToJson,
            formToObject: formToObject,
            getUserNameFromId(id) {
                return store.state.game.members.find(member => member.user_id == id).user_name || null;
            }
        },
    });
};

let installBaseProperties = Vue => {
    Vue.prototype.$http = http;
    Vue.prototype.$pusher = pusher;
};

let installUiComponents = Vue => {
    Vue.component('ui-label', require('./components/ui/Label.vue').default);
    Vue.component('ui-input', require('./components/ui/Input.vue').default);
    Vue.component('modal', require('./components/ui/Modal.vue').default);
    Vue.component('icon', require('./components/ui/Icon.vue').default);
};

export default {
    install(Vue) {
        installBaseMixin(Vue);
        installBaseProperties(Vue);
        installUiComponents(Vue);
    },
};
