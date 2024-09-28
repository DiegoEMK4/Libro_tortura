import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('../views/principal/inicio.vue')
    },
    {
      path: '/registroLibro',
      name: 'registroLibro',
      component: () => import('../views/principal/registrarLibro.vue')
    },
    {
      path: '/registroUsuario',
      name: 'registroUsuario',
      component: () => import('../views/principal/registrarUsuario.vue')
    },
    {
      path: '/libro-crud',
      name: 'libro-crud',
      component: () => import('../views/principal/libro-crud.vue')
    },
    {
      path: '/generar-excel',
      name: 'generar-excel',
      component: ()=> import('../views/principal/generar-excel.vue')
    },
    {
      path: '/registroSesiones',
      name: 'registroSesiones',
      component: ()=> import('../views/principal/registrar-sesiones.vue')
    }
    
  ]
})

export default router
