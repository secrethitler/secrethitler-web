import http from './http';

let installBaseProperties = Vue => {
    Vue.prototyoe.$http = http;
};

let installUiComponents = Vue => {};

export default {
    install(Vue) {
        installBaseProperties(Vue);
        installUiComponents(Vue);
    },
};
