
import Vue from 'vue'
import Router from 'vue-router'
import MainSlides from '@/components/MainSlides'

import NostreamData from '@/components/NostreamData'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/photoSlide',
            name: 'Main',
            component: MainSlides
        },
        {
            path: '/photoSlide/:id',
            name: 'MainSlides',
            component: MainSlides
        },
        {
            path: '/nodata',
            name: 'nodata',
            component: NostreamData
        }
        ,
        {
            path: '/:id',
           redirect: '/photoSlide/:id'
        },
        {
            path: '/',
           redirect: '/photoSlide'
        }
        
    ]
})