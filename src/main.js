import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

// 数据请求库
import axios from 'axios'
axios.defaults.timeout = 3000 // 请求超时时间
axios.defaults.baseURL = 'http://localhost:8080' // 请求根路径
Vue.prototype.$http = axios // axios原型挂载

// vant UI框架
import 'vant/lib/index.css';
import Vant from 'vant';
Vue.use(Vant);
// 懒加载模块
import { Lazyload } from 'vant';
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
