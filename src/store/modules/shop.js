
export default{
    state:{
		datas:[
			{'id':1,picture:'/static/images/shoes.jpg','title':"耐克Nike AIR ZOOM PEGASUS 34 男款跑鞋",'price':509},
			{'id':2,picture:'/static/images/shoes.jpg','title':"耐克Nike TESSEN 女款运动鞋",'price':483},
			{'id':3,picture:'/static/images/shoes.jpg','title':"耐克Nike WMNS NIKE COURT ROYALE 女款运动板鞋",'price':399},
			{'id':4,picture:'/static/images/shoes.jpg','title':"耐克Nike 弹力透气 中性款袜子 三对装",'price':49},
			{'id':5,picture:'/static/images/shoes.jpg','title':"耐克Nike CLASSIC CORTEZ LEATHER 女款运动鞋",'price':615},
			{'id':6,picture:'/static/images/shoes.jpg','title':"耐克Nike 舒爽快干 男款运动短裤",'price':159},
			{'id':7,picture:'/static/images/shoes.jpg','title':"耐克Nike 排汗纯棉 男款短袖T恤",'price':175},
			{'id':8,picture:'/static/images/shoes.jpg','title':"耐克Nike TANJUN 男款运动鞋",'price':419}
		],
		value: ''
	},
	mutations:{
		search(state, value){
			state.value = value
		}
	},
	actions:{
		searchGood(context, data){
			context.commit('search',data)
		}
	},
	getters:{
		searchList: state => {
			return state.datas.filter(data => data.title.search(state.value) != -1)
		}
	}
}