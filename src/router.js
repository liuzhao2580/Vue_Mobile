import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home.vue'
import home from '@/views/home/home.vue'
import shopcar from '@/views/shopcar/shopcar.vue'
import mine from '@/views/mine/mine.vue'
import goodsDetail from '@/views/goodsDetail/goodsDetail.vue'
Vue.use(Router)

export default new Router({
    linkActiveClass: "active",
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        // home
        {
            path: "/",
            component: Home,
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: home,
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                    },
                }
            ]
        },
        // 点击home页面的搜索框
        {
            path: "/detail",
            name: "detail",
            meta: {
                keepAlive: false, //此组件不需要被缓存
            },
            component: () => import(/* webpackChunkName: "detail" */ '@/views/home/search/detail/detail.vue')
        },
        // shop 
        {
            path: "/",
            component: Home,
            
            children: [
                {
                    path: '/shop',
                    name: 'shop',
                    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/shop.vue'),
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                    },
                }
            ]
        },
        // shopcar
        {
            path: "/",
            component: Home,
            meta: {
                keepAlive: true, //此组件需要被缓存
            },
            children: [
                {
                    path: '/shopcar',
                    name: 'shopcar',
                    // component: () => import(/* webpackChunkName: "shopcar" */ '@/views/shopcar/shopcar.vue')
                    component: shopcar
                }
            ]
        },
        // mine
        {
            path: "/",
            component: Home,
            children: [
                {
                    path: '/mine',
                    name: 'mine',
                    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/mine.vue'),
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                    },
                }
            ]
        },
        // 商品详情
        {
            path: "/goodsDetail",
            name: "goodsDetail",
            meta: {
                keepAlive: false, //此组件不需要被缓存
            },
            component: () => import(/* webpackChunkName: "goodsDetail" */ '@/views/goodsDetail/goodsDetail.vue')
        },
    ]
})
