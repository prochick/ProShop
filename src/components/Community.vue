<template>
   <!-- 社区组件 -->
  <div id="app">
	<!-- 顶部栏 -->
	<van-row gutter="20" class="row-1">
		<van-col span="3" class="cols">
			<a href="#" @click="redirects('/login')" v-show="!user_state">登录</a>
			<a href="#" @click="redirects('/me')" v-show="user_state">我的</a>
		</van-col>
		<van-col span="19" class="cols">
			<form action="/">
				<van-search class="search" style="background:white;height:35px;border-radius:22px;"
					@click.stop="search" placeholder="大家在搜索：一只小羊"/>
			</form>
		</van-col>
		<van-col span="2" class="cols">
			<van-icon name="qr" class="classfic"/>
		</van-col>
	</van-row>

    <!-- 上方标签：动态，热门，发现 -->
    <van-row>
      <van-col span="24">
        <van-tabs v-model="active" swipeable v-tab>
          <van-tab v-for="index in 3" :title="title[index]" :key="index.id" class="tab">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

              <!-- 动态版块 -->
              <div v-if="title[index]== '动态'" class="contain">
                <news :tabs="title[index]" />
              </div>

              <!-- 热门版块 -->
              <div v-if="title[index]== '热门'" class="contain">
                <news :tabs="title[index]" />
              </div>

              <!-- 发现版块 -->
              <div v-if="title[index]== '发现'" class="contain">
                <news :tabs="title[index]" />
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
import { mapState,mapActions,mapGetters } from 'vuex';
import news from './News.vue';

export default {
  name: 'community',
  components:{
	news,//引入News组件
  },
  data() {
    return {
        tabarActive:1,
        value:null,
        active:0,
        imageList:[],
        disabled:false,
        show:true,
        count: 0,
        isLoading: false
    }
  },
  computed: {
    ...mapState({
		title: state => state.community.tab.title,
		icon: state => state.home.badge.icon,
		actives: state => state.active.home.title,
		src : state => state.home.lunbo.src,
		user_state: state => state.login.user_state,// 用户登录状态
		shop_info: state => state.home.shop_info,// 购物车信息
		my_info: state => state.home.my_info,// 我的信息
		community_info: state => state.community.community_info// 社区信息
    })
  },
  methods: {
    //搜索，用路由转到搜索页面
    search() {
		this.$router.push('/search');
    },
    //刷新方法
    onRefresh() {
		setTimeout(() => {
			this.$toast('刷新成功');//显示提示刷新成功
			this.isLoading = false;//正在加载标识变为false
			this.count++;
		}, 500);//延迟0.5秒
    },
	// 页面重定向
    redirects(url) {
		this.$router.push(url);
    },
  },
  //局部自定义指令
  directives: {
    tab:{
      inserted(el) {
        //绑定tab样式
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = '#d34ba8';
      }
    }
  },
  //钩子函数
  beforeCreate() {
	this.$http.get('/static/data.json').then((res)=>{
		if( res.status == 200 ) {
			const data = res.data.home;
		} else {
			this.imageList = this.src;
		}},(err)=>{
			this.imageList = this.src;
	})
  }
}
</script>
<!-- 引入外部样式 -->
<style lang="less" scoped>
	@import url('../assets/css/home.less');
</style>

