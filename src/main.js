// 引入vue
import Vue from 'vue'
// 引入全局文件
import App from './App.vue'
// 引入router 路由
import router from './router.js'

Vue.config.productionTip = false
// 实例全局
new Vue({
  // 挂载到全局示例
  router,
  render: h => h(App),
}).$mount('#app')
