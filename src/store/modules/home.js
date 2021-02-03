
export default {
    state:{    
		tab:{
			title:['','今日推荐','时尚','美妆','家电','家居','国际','生活'],
		},
		badge:{
			icon:['icon_1','icon_2','icon_8','icon_4','icon_5','icon_6','icon_7','icon_10'],
			title:['鞋包馆','运动馆','母婴馆','超市','女装馆','美妆馆','男装馆','更多'],
		},
		lunbo:{
			src:[
				'../../public/static/images/lunbo/err.jpg',
				'../../public/static/images/lunbo/err.jpg',
				'../../public/static/images/lunbo/err.jpg',
				'../../public/static/images/lunbo/err.jpg',
				'../../public/static/images/lunbo/err.jpg',
				'../../public/static/images/lunbo/err.jpg',
				'../../public/static/images/lunbo/err.jpg'
			],
		},
		imageList:[],
		broadcast:[],
		bc:true,
		show:true,
		sshow:false,
		shop_info:1,
		my_info:1,
		buyInfo:{
			img:[
				'https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg'
			],
		},
		orderShow:false,
		numO:null,
    },
    mutations:{
		search_(state) {
			state.show = false
		},
		buySearch(state, img) {
			state.buyInfo.img[0] = img 
		},
		orderShow_(state) {
			state.orderShow ? state.orderShow = false : state.orderShow = true;
			setTimeout(() => {
				state.orderShow = false
			}, 20000);
		},
		addNum(state, e) {
			state.numO = e
		},
		shopCartInfo(state) {
			state.shop_info += 4
		}
	},
	actions:{
		searchA(context) {
			context.commit('search_')
		},
		buyParam(context, img) {
			context.commit('buySearch',img)
		},
		orderShows(context) {
			context.commit('orderShow_')
		},
		orderNum(context, e) {
			context.commit('addNum',e)
		},
		infoAction(context) {
			context.commit('shopCartInfo')
		}
	},
	getters:{
		bc_notshow(state){
			setTimeout(() =>{
				state.bc = false
			},20000)
			return state.bc
		}
	}
}