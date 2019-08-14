import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let routes = [
    {
        path: '/',
        name: 'landingpage',
        component: require('./views/Landingpage.vue').default,
    },
    {
        path: '/game/create',
        name: 'game.create',
        component: require('./views/GameCreate.vue').default,
    },
    {
        path: '/game/join',
        name: 'game.join',
        component: require('./views/GameJoin.vue').default,
    },
    {
        path: '/game/:id',
        name: 'game',
        component: require('./views/Game.vue').default,
        children: [
            {
                path: 'lobby',
                name: 'lobby',
                component: require('./views/GameLobby.vue').default
            },
            {
                path: 'president-elect',
                name: 'president-elect',
                component: require('./views/PresidentElect.vue').default,
            },
        ],
    },
];

let router = new Router({
    mode: 'history',
    routes,
});

router.afterEach((to, from) => {
    // 
});

export default router;
