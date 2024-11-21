import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/about', name: 'About', component: About, meta: { requiresAuth: true } }
  ]
});

// Verificar la autenticación antes de cada navegación
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';  // Obtener estado de autenticación desde localStorage

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirigir al login
    next('/');
    
  } else {
    // Continuar la navegación
    next();
  }
});

export default router;
