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
// 引入首页右侧的列表
import users from './components/users.vue'
// 组件
let routes = [
    // 登录页
    {
        path:'/',
        component:login
    },
    // 首页
    {
        path:'/index',
        component:index,
        // 嵌套一个路由 
        children:[
            {
                // 首页右侧的列表
                path:'users',
                component:users
            }
        ]
    }
]
// 实例组件
let router = new VueRouter({
    routes
})
// 暴露出去 让main引入
export default router