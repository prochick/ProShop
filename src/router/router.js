import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home.vue'
import Community from '@/components/Community.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Search from '@/components/Search.vue'
import GoodsInfo from '@/components/GoodsInfo.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import Buy from '@/components/BuyInfo.vue'
import Pay from '@/components/OrderPay.vue'
import Me from '@/components/Me.vue'

export default new Router({
	mode:'hash',
	routes: [
		{
			path:'/', 
			redirect:'/home',
		},
		{
			path:'/community',
			name:'community',
			component: Community,
		},
		{
			path:'/search',
			name:'search',
			component:Search
		},
		{
			path:'/goods/:id',
			name:'goodsInfo',
			component:GoodsInfo,
		},
		{
			path:'/login',
			name:'login',
			component:Login
		},
		{
			path:'/register',
			name:'register',
			component:Register
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
		},
		{
			path: '/shoppingCart',
			name: 'shoppingCart',
			component: ShoppingCart,
		},
		{
			path:'/goods/:id/buy',
			name:'buyInfo',
			component:Buy,
		},
		{
			path:'/goods/:id/buy/pay',
			name:'pay',
			component:Pay,
		},
		{
			path:'/me',
			name:'me',
			component:Me
		},
		{
			path:'*',
			redirect:'/',
		}
	]
})
