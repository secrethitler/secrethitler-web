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
        path: '/game',
        redirect: '/game/join'
    },
    {
        path: '/create-game',
        name: 'game.create',
        component: require('./views/GameCreate.vue').default,
    },
    {
        path: '/join-game',
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
                path: 'info',
                name: 'info',
                component: require('./views/GameInfo.vue').default
            },
            {
                path: 'nominate',
                name: 'nominate',
                component: require('./views/GameNominate.vue').default
            },
            {
                path: 'vote',
                name: 'vote',
                component: require('./views/GameVote.vue').default
            },
            {
                path: 'vote-result',
                name: 'vote-result',
                component: require('./views/GameVoteResult.vue').default
            },
            {
                path: 'president-select-policy',
                name: 'president-select-policy',
                component: require('./views/GamePresidentSelectPolicy.vue').default
            },
            {
                path: 'chancellor-select-policy',
                name: 'chancellor-select-policy',
                component: require('./views/GameChancellorSelectPolicy.vue').default
            },
            {
                path: 'game-over',
                name: 'game-over',
                component: require('./views/GameWon.vue').default
            },
            // Special President Powers
            {
                path: 'eliminate-player',
                name: 'eliminate-player',
                component: require('./views/GameKillPlayer.vue').default
            },
            {
                path: 'is-eliminated',
                name: 'is-eliminated',
                component: require('./views/GameIsKilled.vue').default
            },
            {
                path: 'policy-peek',
                name: 'policy-peek',
                component: require('./views/GamePolicyPeek.vue').default
            }
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
