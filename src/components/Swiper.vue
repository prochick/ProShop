<!-- 轮播组件 -->
<template>
   <div>
    <van-row>
      <van-col span="24">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" style="width:100%;height:160px;" @click.stop = "redirect('/goods/id_0')"/>
            </van-swipe-item>
        </van-swipe>
      </van-col>
	</van-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'swiper',
  data() {
    return {
        images:[],// 轮播图片
    }
  },
  props:{
    tabs:{
      type:String,
      required:true,
      default(){
        return {
            tabs:'err.jpg'
        }
      }
    }
  },
  computed: {
    ...mapState({
       src : state => state.home.lunbo.src// 轮播图片
    })
  },
  methods: {
	// 页面重定向
	redirect(url){
		this.$router.push(url);
	}
  },
  created() {
	this.$http.get('/static/data.json').then((res)=>{
		if( res.status == 200 ) {
			const data = res.data.home.lunbo;
			if(this.tabs == '今日推荐') { 
				this.images = data.home;
			}else if(this.tabs == '时尚'){
				this.images = data.shishang;
			}else if(this.tabs == '美妆'){
				this.images = data.meizhuang;
			}else if(this.tabs == '家电') {
				this.images = data.jiadian;
			}else if(this.tabs == '家居') {
				this.images = data.jiaju;
			}else if(this.tabs == '国际') {
				this.images = data.guoji;
			}else if(this.tabs == '生活') {
				this.images = data.shenghuo;
			}else{
				this.images = this.src;
			}
		}else{
			this.images = this.src;
		}      
	},()=>{
		this.images = this.src;
	})
  }
}
</script>


