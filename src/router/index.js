
import Vue from 'vue'
import Router from 'vue-router'
import MainSlides from '@/components/MainSlides'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainSlides
        },
        {
            path: '/:id',
            name: 'MainSlides',
            component: MainSlides
        }        
    ]
})