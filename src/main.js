// 引入vue
import Vue from 'vue'
// 引入全局文件
import App from './App.vue'
// 引入router 路由
import router from './router.js'

// 引入全局样式
import './assets/base.scss'

// 导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 注册全局面包屑
import mybread from './components/myBread.vue'
Vue.component('my-bread',mybread)

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 设置基地址
axios.defaults.baseURL  = 'http://localhost:8888/api/private/v1/'

// 拦截器 数据发送之前拦截
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 统一设置token
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 拦截器 数据处理自去年拦截
// Add a response interceptor
axios.interceptors.response.use(function (response) {

  // 统一设置弹窗
  if ([200,201,204].indexOf(response.data.meta.status)!=-1) {
    // 请求成功 后弹出的框
    Vue.prototype.$message.success(response.data.meta.msg)
  }else{
    // 请求失败后弹出的框
    Vue.prototype.$message.warning(response.data.meta.msg)
  }
  
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});




Vue.config.productionTip = false
// 实例全局
new Vue({
  // 挂载到全局示例
  router,
  render: h => h(App),
}).$mount('#app')
