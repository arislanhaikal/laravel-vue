import Vue from 'vue'
import VueRouter from 'vue-router'


// Component
import Home from './components/HomeComponent'
import Contact from './components/ContactComponent'
import Admin from './components/ContactListComponent'
import AdminEdit from './components/ContactEditComponent'

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
            component: Admin
        },
        {
            path: '/admin/:id',
            name: 'adminEdit',
            component: AdminEdit
        }
    ]
});

export default routers;