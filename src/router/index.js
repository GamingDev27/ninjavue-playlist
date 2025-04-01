import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/Login.vue'
import SignUpView from '../views/auth/Signup.vue'
import {onAuthStateChanged } from 'firebase/auth'
import { projectAuth } from '@/firebase/config'


const requireAuth = (to, from, next) => {
  onAuthStateChanged(projectAuth, (user) => {
    if (!user) {
      next({ name: 'login' })
    } else {
      next()
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/playlist/create',
      name: 'create-playlist',
      component: () => import('../views/playlist/CreatePlaylist.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/playlist/:id',
      name: 'playlist-details',
      component: () => import('../views/playlist/PlaylistDetailsView.vue'),
      beforeEnter: requireAuth,
      props:true
    },
  ],
})

export default router
