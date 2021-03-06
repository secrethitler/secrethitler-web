import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import plugin from './plugin';
import './registerServiceWorker';

Vue.use(plugin);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
