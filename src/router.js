import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './componente/Inicio.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[{
        path: '/',
        component: Inicio
    }]
})
