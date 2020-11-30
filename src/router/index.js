import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Create',
    component: () => import('../views/Create.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue'),
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('../views/Task.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
