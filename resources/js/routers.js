import Vue from 'vue'
import VueRouter from 'vue-router'


// Component
import Home from './components/HomeComponent'
import Contact from './components/ContactComponent'
import Admin from './components/ContactListComponent'
import AdminEdit from './components/ContactEditComponent'
import Login from './components/Auth/LoginComponent'
import Register from './components/Auth/RegisterComponent'

Vue.use(VueRouter)

const routers = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                auth: true
            }
        },
        {
            path: '/admin/:id',
            name: 'adminEdit',
            component: AdminEdit,
            meta: {
                auth: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});

export default routers;