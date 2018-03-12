
import Vue from 'vue'
import Router from 'vue-router'
import MainSlides from '@/components/MainSlides'
import '../scss/main.scss';

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

// <style lang="scss" scoped>
// @import "../scss/main.scss";
// </style>