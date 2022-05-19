import { createRouter, createWebHistory } from 'vue-router'
import Annuaire from '../views/Annuaire.vue'
import Login from '../views/Login.vue'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Annuaire,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// vérifie avant chaque chemin si l'utilisateur est connécté (si non est envoyé a la page de login)
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !store.getters.getUtilisateur) {
    next({name:'login',params:{topath:to}})
  } else {
    next()
  }
})

export default router
