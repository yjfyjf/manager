
// 引入axios
import axios from 'axios'

// 引入 router
import router from './router'

export default {
    install(Vue) {
        // 设置基地址
        axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

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

            if (response.data.meta.msg === '无效token' && response.data.meta.status === 400) {
                Vue.prototype.$message.warning('小老弟,伪造token 牛逼哦  滚')
                window.sessionStorage.removeItem('token')
                router.push('/login')
                return
            }
            // 统一设置弹窗
            if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
                // 请求成功 后弹出的框
                Vue.prototype.$message.success(response.data.meta.msg)
            } else {
                // 请求失败后弹出的框
                Vue.prototype.$message.warning(response.data.meta.msg)
            }

            // Do something with response data
            return response;

        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
        Vue.prototype.$axios = axios
    }
}