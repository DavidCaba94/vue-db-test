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
    path: '/global',
    name: 'Global',
    component: () => import(/* webpackChunkName: "global" */ '../views/Global.vue')
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
  },
  {
    path: '/crear-ruta',
    name: 'Crear Ruta',
    component: () => import(/* webpackChunkName: "crear-ruta" */ '../views/CrearRuta.vue')
  },
  {
    path: '/ruta/:id',
    name: 'Ruta',
    component: () => import(/* webpackChunkName: "ruta" */ '../views/Ruta.vue')
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: () => import(/* webpackChunkName: "mapa" */ '../views/Mapa.vue')
  },
  {
    path: '/aviso-legal',
    name: 'AvisoLegal',
    component: () => import(/* webpackChunkName: "aviso-legal" */ '../views/AvisoLegal.vue')
  },
  {
    path: '/politica-privacidad',
    name: 'PoliticaPrivacidad',
    component: () => import(/* webpackChunkName: "politica-privacidad" */ '../views/PoliticaPrivacidad.vue')
  },
  {
    path: '/cookies',
    name: 'Cookies',
    component: () => import(/* webpackChunkName: "cookies" */ '../views/Cookies.vue')
  },
  {
    path: '/condiciones-generales',
    name: 'CondicionesGenerales',
    component: () => import(/* webpackChunkName: "condiciones-generales" */ '../views/CondicionesGenerales.vue')
  },
  {
    path: '/editar-ruta/:id',
    name: 'EditarRuta',
    component: () => import(/* webpackChunkName: "editar-ruta" */ '../views/EditarRuta.vue')
  },
  {
    path: '/eliminar-ruta/:id',
    name: 'EliminarRuta',
    component: () => import(/* webpackChunkName: "eliminar-ruta" */ '../views/EliminarRuta.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;