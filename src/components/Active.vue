<!-- 活动组件 -->
<template>
	<div id="app">
		<van-row class="col-2">
			<!--标题 -->
			<van-col span='24'>
				<h4>{{ actives[0] }}</h4>  
			</van-col>
		</van-row>
		<van-row class="lazys">
			<van-row v-for="(img, index) in imageList" :key='img.id'>
				<img  v-lazy="img" name="adapter" @click.stop="redirect('/goods/id_0')"/>
				<van-col span="16" offset="2" class="lazy-left">
					<h4 @click.stop="redirect('/goods/id_0')">{{activeTitle[index]}}</h4>
				</van-col>
				<van-col span="6" class="lazy-right">
					<span>{{'剩余'+days[index]+'天'}}</span>
				</van-col>
			</van-row>
		</van-row>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'active',
  data() {
    return {
        imageList:[],// 图片列表
        activeTitle:[],// 活动标题
        days:[]// 剩余天数
    }
  },
  props:{
    tabs:{
      type:String,
      required:true,
      default(){
        return {
            tabs:'errTitle'
        }
      }
    }
  },
  computed: {
    ...mapState({
		actives: state => state.active.home.title,// 当前活动标题
		src : state => state.home.lunbo.src // 图片列表
    })
  },
  methods: {
	// 页面重定向
	redirect(url){
		this.$router.push(url);
	},
  },
  created() {
    this.$http.get('/static/data.json').then((res)=>{
        if( res.status == 200 ) {
			const data = res.data.home;
			this.days = data.active.days
			switch(this.tabs){
				case '今日推荐' :
					this.activeTitle = data.active.tuijian_title;
					this.imageList = data.imageList;
					break;
				case '时尚' :
					this.activeTitle = data.active.shishang_title;
					this.imageList = data.shishangImglist;
					break;
				case '美妆' :
					this.activeTitle = data.active.meizhuang_title;
					this.imageList = data.meizhuangImglist;
					break;
				case '家电' :
					this.activeTitle = data.active.jiadian_title;
					this.imageList = data.jiadianImglist;
					break;
				case '家居' :
					this.activeTitle = data.active.jiaju_title;
					this.imageList = data.jiajuImglist;
					break;
				case '国际' :
					this.activeTitle = data.active.guoji_title;
					this.imageList = data.guojiImglist;
					break;
				case '生活' :
					this.activeTitle = data.active.shenghuo_title;
					this.imageList = data.shenghuoImglist;
					break;
				default:
					break; 
			}
        } else {
			this.imageList = this.src;
        }
    },()=>{
		this.imageList = this.src;
    })
  }
}
</script>

<style lang="less" scoped>
	@import url('../assets/css/home.less');
</style>

