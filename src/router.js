import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './components/RegisterForm.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import SuccessPage from './components/SuccessPage.vue'

Vue.use(VueRouter);
const routes = [
      {path: '/', component: Home},
      {path: '/login', component: Login},
      {path: '/register', component: Register},
      {path: '/successfulPage', component: SuccessPage},
      {path: '/notFound(.*)', redirect: '/' }
];

const router = new VueRouter({
    mode: "history",
    routes,
  });

export default router;
