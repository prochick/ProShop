<!-- 社区消息组件 -->
<template>
	<div id="app" class="prograph">
        <!-- 懒加载瀑布流-->
		<div class="lazys">
			<van-row v-for="(img,index) in imageList" :key='img.id'>  
				<!-- 发布者信息模块 -->
				<van-row class="col-comm-1">
					<van-col span='2'>
						<div class="head">
							<img  v-lazy="img" name="adapter" /> 
						</div>
					</van-col>
					<van-col span="14" class="author">
						<span>热门内容,来自: {{author[index]}}</span>
					</van-col>
					<!-- 分享 -->
					<van-col span="8" class="share">
						<span @click.stop="pop()">...</span>
					</van-col>
					<!-- 弹出层 -->
					<van-popup v-model="show" position="bottom" :overlay="true">
						<div class="empty">
							<h4 @click="shareT('转发成功 ^_^')">{{shareTitle[0]}}</h4>
							<h4 @click="shareT('已送达好友身边 ^_^')">{{shareTitle[1]}}</h4>
							<h4 @click="shareT('已取消 ^_^')">{{shareTitle[2]}}</h4>
						</div>
					</van-popup>
				</van-row>

				<!-- 标题内容 -->
				<van-col span="16" offset="1" class="lazy-lefts">
					<h4 @click="conTip('获取资源失败了 o(╥﹏╥)o')">{{activeTitle[index]}}</h4>
				</van-col>
				<!-- 图片内容 -->
				<img  v-lazy="img" name="adapter" @click="conTip('获取资源失败了 o(╥﹏╥)o')"/>
				<!-- 文字内容 -->
				<van-col span="24" class="lazy-leftp">
					<p @click="conTip('你是不是没流量了 o(╥﹏╥)o')">{{grefContent[index]}}</p>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Toast } from 'vant';

export default {
  name: 'active',
  data() {
    return {
        tabarActive:0,
        value:null,
        active:0,
        imageList:[],
        watch:null,
        disabled:false,
        author:[],
        show: false,
        grefContent:null,
		activeTitle:''
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
		title: state => state.home.tab.title,
		icon: state => state.home.badge.icon,
		shareTitle: state => state.community.share.title,
		actives: state => state.active.home.title,
		src : state => state.home.lunbo.src,
		days: state => state.active.home.days,
    })
  },
  methods: {
    //分享弹出页面方法
    pop() {
        this.show = true;
    },
    shareT(message){
		Toast(message);
		this.show = false;
    },
    //弹出提示，内容为message传入的值
    conTip(message){
		Toast(message);
    }
  },
  //钩子函数，创建实例对象之前执行，提前加载分类标签
  beforeCreate() {
      this.$http.get('/static/data.json').then((res)=>{
          if( res.status == 200 ) {
                const data = res.data.home;
                const dataComm = res.data.community;
                this.watch = dataComm.watch;
                switch(this.tabs){
                    case '动态' :
                        this.activeTitle = data.active.tuijian_title;
                        this.imageList = data.imageList;
                        this.author = dataComm.author;
                        this.grefContent = dataComm.grefContent;
                        break;
                    case '热门' :
                        this.activeTitle = data.active.shishang_title;
                        this.imageList = data.shishangImglist;
                        this.author = dataComm.author;
                        this.grefContent = dataComm.grefContent;
                        break;
                    case '发现' :
                        this.activeTitle = data.active.meizhuang_title;
                        this.imageList = data.meizhuangImglist;
                        this.author = dataComm.author;
                        this.grefContent = dataComm.grefContent;
                        break;
                    default:
                        break; 
                  }
          } 
          else {
             this.imageList = this.src;
          }
      },(err)=>{
            this.imageList = this.src;
      })
  },
  //创建页面时的提示
  created() {
     Toast('一起发现更大的世界 ^_^');
  }
}
</script>
<!-- 引入外部样式 -->
<style lang="less" scoped>
	@import url('../assets/css/home.less');
</style>

