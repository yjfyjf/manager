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

// 导入moment
import moment from 'moment'
Vue.filter('fromTime',function (value,fmtTemplate){
  if (fmtTemplate) {
    return moment(value).format(fmtTemplate)
  }else{
    return moment(value).format('YYYY-MM-DD')
  }
})
// 导入自己的axios插件
import axios from './myaxios'
Vue.use(axios)

Vue.config.productionTip = false
// 实例全局
new Vue({
  // 挂载到全局示例
  router,
  render: h => h(App),
}).$mount('#app')
