import http from './http';
import pusher from './pusher';
import nprogress from 'nprogress';

const formToJson = (form) => {
    let formData = new FormData(form);
    let object = {};

    formData.forEach((value, key) => {
        object[key] = value;
    });

    return JSON.stringify(object);
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
            formToJson: formToJson
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
};

export default {
    install(Vue) {
        installBaseMixin(Vue);
        installBaseProperties(Vue);
        installUiComponents(Vue);
    },
};
