import Register from './components/RegisterForm.vue'
import Login from './components/Login.vue'

export default ({
    routes: [
        {path: '/', component: Register},
        {path: '/login', component: Login}
    ]
})