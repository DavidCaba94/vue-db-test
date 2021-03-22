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
    component: () => import(/* webpackChunkName: "rutas" */ '../views/Rutas.vue')
  },
  {
    path: '/social',
    name: 'Social',
    component: () => import(/* webpackChunkName: "social" */ '../views/Social.vue')
  },
  {
    path: '/mis-rutas',
    name: 'Mis Rutas',
    component: () => import(/* webpackChunkName: "mis-rutas" */ '../views/MisRutas.vue')
  },
  {
    path: '/estadisticas',
    name: 'Estadísticas',
    component: () => import(/* webpackChunkName: "estadisticas" */ '../views/Estadisticas.vue')
  },
  {
    path: '/clasificaciones',
    name: 'Clasificaciones',
    component: () => import(/* webpackChunkName: "clasificaciones" */ '../views/Clasificaciones.vue')
  },
  {
    path: '/sorteos',
    name: 'Sorteos',
    component: () => import(/* webpackChunkName: "sorteos" */ '../views/Sorteos.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import(/* webpackChunkName: "productos" */ '../views/Productos.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "perfil" */ '../views/Perfil.vue')
  },
  {
    path: '/home',
    name: 'Home',
    alias: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/bienvenido',
    name: 'Bienvenido',
    component: () => import(/* webpackChunkName: "bienvenido" */ '../views/Bienvenido.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
  },
  {
    path: '/eliminar-cuenta',
    name: 'Eliminar cuenta',
    component: () => import(/* webpackChunkName: "eliminar-cuenta" */ '../views/EliminarCuenta.vue')
  },
  {
    path: '/usuario/:id',
    name: 'Usuario',
    component: () => import(/* webpackChunkName: "usuario" */ '../views/Usuario.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;