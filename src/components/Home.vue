<!-- 首页组件 -->
<template>
  <div id="app">
    <!-- 顶部栏 -->
    <van-row gutter="20" class="row-1">
      <van-col span="3" class="cols">
        <a href="#" @click.prevent="redirects('/login')" v-show="!user_state">登录</a>
		<a href="#" @click.prevent="redirects('/me')" v-show="user_state">我的</a>
      </van-col>
      <van-col span="19" class="cols">
        <form action="/">
          <van-search class="search" style="background:white;height:35px;border-radius:22px;"
			@click.stop="search" placeholder="大家在搜索：一只小羊"/>
        </form>
      </van-col>
      <van-col span="2" class="cols">
        <van-icon name="qr" class="classfic" @click="tip()"/>
      </van-col>
    </van-row>
	
	<!-- 中间区域 -->
	<van-row>
		<van-col span="24">
			<van-tabs swipeable v-tab>
				<van-tab v-for="index in 7" :title="title[index]" :key="index.id" class="tab">
					<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
						<!-- 今日推荐版块 -->
						<div v-if="title[index]== '今日推荐'" class="contain">
							<swiper class="swiper" :tabs="title[index]"/>
							<van-row class="col-2">
								<van-col class="row-2" span="6" v-for="(v, index) in icon" :key="v.id">
									<a href="#">
										<img :src="'/static/images/icon/'+icon[index]+'.png'" @click="redirects('/goods/id_0')"/>
										<span>{{ bageTitle[index] }}</span>
									</a>
								</van-col>
								<!-- 通知 -->
								<van-col span="24" style="margin-top:20px;" v-show="bc_notshow">
									<van-notice-bar mode="link" left-icon="/static/images/laba.png">
										{{ broadcast[0] }}
									</van-notice-bar>
								</van-col>
							</van-row>
							<active :tabs="title[index]" />
						</div>

						<!-- 时尚版块 -->
						<div v-if="title[index] == '时尚'" class="contain">
							<swiper class="swiper" :tabs="title[index]" />
							<active :tabs="title[index]" />
						</div>

						<!-- 美妆版块 -->
						<div v-if="title[index] == '美妆'" class="contain">
							<swiper class="swiper" :tabs="title[index]" />
							<active :tabs="title[index]" />
						</div>

						<!-- 家电版块 -->
						<div v-if="title[index] == '家电'" class="contain">
							<swiper class="swiper" :tabs="title[index]"/>
							<active :tabs="title[index]"/>
						</div>

						<!-- 家居版块 -->
						<div v-if="title[index] == '家居'" class="contain">
							<swiper class="swiper" :tabs="title[index]" />
							<active :tabs="title[index]" />
						</div>

						<!-- 国际版块 -->
						<div v-if="title[index] == '国际'" class="contain">
							<swiper class="swiper" :tabs="title[index]" />
							<active :tabs="title[index]" />
						</div>

						<!-- 生活版块 -->
						<div v-if="title[index] == '生活'" class="contain">
							<swiper class="swiper" :tabs="title[index]" />
							<active :tabs="title[index]" />
						</div>
					</van-pull-refresh>
				</van-tab>
			</van-tabs>
		</van-col>
	</van-row>
	
	<!-- 底部菜单栏 -->
	<van-tabbar v-model="tabarActive">
		<van-tabbar-item icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>
		<van-tabbar-item icon="chat-o" :dot="community_info" @click="redirects('/community')">社区</van-tabbar-item>
		<van-tabbar-item icon="shopping-cart" :info="shop_info" @click="redirects('/shoppingCart')">购物车</van-tabbar-item>
		<van-tabbar-item icon="contact" :info="my_info" @click="redirects('/me')">我的</van-tabbar-item>
	</van-tabbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';// 引入状态管理
import swiper from './Swiper';// 引入轮播图组件
import active from './Active';// 引入活动组件
import { Toast } from 'vant';// 引入提示插件

export default {
  name: 'home',
  components:{
	swiper,
	active,
  },
  data() {
    return {
        tabarActive:0,// 当前处于焦点状态的底部栏
        imageList:[],// 轮播图图片
        isLoading: false,// 是否正在刷新
		broadcast:[]// 通知的内容
    }
  },
  computed: {
    ...mapState({
		user_state: state => state.login.user_state,// 当前用户登录状态
		title: state => state.home.tab.title,// 选项栏标题
		icon: state => state.home.badge.icon,// 分类图标
		bageTitle: state => state.home.badge.title,// 分类标题
		src : state => state.home.lunbo.src,// 轮播图图片
		shop_info: state => state.home.shop_info,// 购物车信息
		my_info: state => state.home.my_info,// 我的信息
		community_info: state => state.community.community_info// 社区信息
    }),
    ...mapGetters(['bc_notshow'])// 通知的显示
  },
  methods: {
	// 搜索
    search() {
		this.$router.push('/search');
    },
	// 刷新
	onRefresh() {
		setTimeout(() => {
			this.$toast('刷新成功');
			this.isLoading = false;
		}, 500);
	},
	// 重定向页面
    redirects(url) {
       this.$router.push(url);
    },
	// 提示
    tip() {
       Toast('该功能暂未开启，敬请期待~');
    }
  },
  // 自定义指令
  directives: {
    tab:{
      inserted(el) {
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = '#d34ba8';
      }
    }
  },
  created() {
	this.$http.get('/static/data.json').then((res)=>{
		if( res.status == 200 ) {
			const data = res.data.home;
			this.broadcast = data.broadcast;
		} else {
			this.imageList = this.src;
			this.broadcast = "暂无消息~~QAQ~"
		}
	},()=>{
		this.imageList = this.src;
		this.broadcast = "暂无消息~~QAQ~"
    })
  }
}
</script>

<style lang="less" scoped>
	@import url('../assets/css/home.less');
</style>

