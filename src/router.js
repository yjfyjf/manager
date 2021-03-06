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
// 引入权限管理/角色列表
import roles from './components/roles.vue'
// 引入权限管理/权限列表
import rights from './components/rights.vue'
// 引入商品管理/商品列表
import goods from './components/goods.vue'
// 引入商品列表/商品分类
import categories from './components/categories.vue'
// 引入订单管理/订单列表
import orders from './components/orders.vue'
// 引入商品管理/分类参数
import params from './components/params.vue'
// 引入数据统计/数据报表
import reports from './components/reports.vue'
// 统一的错误页
import error from './components/error.vue'
// 组件
let routes = [
    // 登录页
    {
    // 错误页
    path:'/error',
    component:error
    },
    {
        path: '/login',
        component: login,
        meta:{
            noLogin : true
        },
    },
    // 首页
    {
        path: '/',
        component: index,
        // 嵌套一个路由 
        children: [
            {
                // 首页右侧的列表
                path: 'users',
                component: users
            },
            {
                // 权限管理/角色列表
                path: 'roles',
                component: roles
            },
            {
                // 权限管理/权限列表
                path: 'rights',
                component: rights
            },
            {
                // 商品管理/商品列表
                path: 'goods',
                component: goods
            },
            {
                // 商品管理/商品分类
                path: 'categories',
                component: categories
            },
            {
                // 订单管理/订单列表
                path: 'orders',
                component: orders
            },
            {
                // 商品管理/分类参数
                path: 'params',
                component: params
            },
            {
                // 数据统计/数据报表
                path: 'reports',
                component: reports
            }
        ]
    }
]
// 实例组件
let router = new VueRouter({
    routes
})

// 导航守卫  前置守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // next()
    // 判断用户输入的地址是否正确
    if (to.matched.length === 0 ) {
        Vue.prototype.$message.error('小老弟 地址不对呀 别搞瓢了')
        next('./error')
    }
    
    if (to.meta.noLogin === true) {
        next()
    } else {
        if (window.sessionStorage.getItem("token")) {
            next()
        } else {
            Vue.prototype.$message.error('老弟,先去登录')
            next('/login')
        }
    }
})
// 暴露出去 让main引入
export default router