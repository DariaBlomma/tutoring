import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Horizonte6 from '../views/Horizonte6.vue';
import Horizonte6 from '../views/Horizonte6.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/horizonte-6',
    name: 'Horizonte6',
    component: Horizonte6,
    сhildren: [
      {
        path: 'mein-zimmer',
        name: 'zimmer',
        component: Zimmer,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
