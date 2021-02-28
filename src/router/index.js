import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
  },
  {
    path: '/rutas',
    name: 'Rutas',
    alias: '/',
    component: () => import(/* webpackChunkName: "rutas" */ '../views/Rutas.vue')
  },
  {
    path: '/bienvenido',
    name: 'Bienvenido',
    component: () => import(/* webpackChunkName: "bienvenido" */ '../views/Bienvenido.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "bienvenido" */ '../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;