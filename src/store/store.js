import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

// 引入store对象
import home from './modules/home';
import active from './modules/active';
import community from './modules/community';
import login from './modules/login'
import shop from './modules/shop'

export default new vuex.Store({
    modules: {
        home: home,
        active: active,
        community: community,
		login: login,
		shop: shop
    }
})
