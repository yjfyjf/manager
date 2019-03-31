// 引入vue
import Vue from 'vue'
// 引入全局文件
import App from './App.vue'
// 引入router 路由
import router from './router.js'

// 引入全局样式
import './assets/base.scss'

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 设置基地址
axios.defaults.baseURL  = 'http://localhost:8888/api/private/v1/'
// 导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false
// 实例全局
new Vue({
  // 挂载到全局示例
  router,
  render: h => h(App),
}).$mount('#app')
