// 引入vue
import Vue from 'vue'
// 引入 vue-router  用什么就装什么包再引入
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)
// 引入登录页
import login from './components/login.vue'
// 引入首页
import index from './components/index.vue'
// 组件
let routes = [
    {
        path:'/',
        component:login
    },
    {
        path:'/index',
        component:index
    }
]
// 实例组件
let router = new VueRouter({
    routes
})
// 暴露出去 让main引入
export default router