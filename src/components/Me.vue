<!-- 我的功能组件 -->
<template>
  <div id="app">
	<van-row class="col-me">
		<van-col span='24' class="title">
			<h4>我的</h4>  
		</van-col>
		
		<!-- 未登录状态 -->
		<van-col span="24" v-if="!user_state">
			<div class="me-img-t" style="text-align: center;">
				<h5 @click="redirects('/login')">你还未登录，请点击此处进行登录！</h5>  
			</div>
		</van-col>
		
		<!-- 登录状态 -->
		<div v-if="user_state">
			<!-- 头像展示 -->
			<van-col span="24" class="headerImg">
				<div class="me-img">
					<van-uploader :after-read="changePhoto" accept="image/gif,image/jpeg" multiple>
						<van-icon name="photograph" style="marginTop:25px;marginLeft:100px;"/>更换头像
					</van-uploader>
					<img :src="photo" name="adapter" @click.stop="redirect('#')" />
				</div>
				<div class="me-img-t" style="text-align: center;">
					<h5>欢迎{{ login_username }}！</h5> 
				</div>
			</van-col>           
			
			<!-- 功能列表 -->
			<van-col span="24" class="headerList" v-for="v in menu" :key="v.id">
				<div class="me-img-ts" @click.stop="listCover(v)">
					<span>{{ v }}</span>  
				</div>
				<div class="me-img-ps">
					<h4>{{'>'}}</h4>  
				</div>
			</van-col>
			
			<!-- 安全模式 -->
			<van-col span="24" class="headerList">
				<div class="me-img-ts">
					<span>安全模式</span>  
				</div>
				<div class="me-img-ps">
					<van-switch :value="checked" size="22px" @input="changeSecurity()" class="btns"/>
				</div>
			</van-col>
			
			<!-- 弹出层（通过v-model控制弹出层是否展示） -->
			<van-popup v-model="shows" position="top" :overlay="true">
				<van-col span='24' class="title" style="width:400px;height:100%;paddingBottom:20px;">
					<!-- 信用展示 -->
					<div v-if="xinyong">
						<h4>{{ menu[0] }}</h4> 
						<van-rate value="5" color='#d34ba8' void-color="#eee"/> 
						<h4 style="color:#d34ba8;">100分</h4> 
						<span style="fontSize:12px;color:#A9A9A9;">本月表现绝佳 &nbsp;小主人再接再厉 ~~</span>
					</div>
					<!-- 订单信息 -->
					<div v-if="dingdan">
						<h4>{{ menu[1] }}</h4>  
					</div>
					<!-- 联系人 -->
					<div v-if="contact">
						<h4>{{ menu[2] }}</h4>  
					</div>
					<!-- 密码设置 -->
					<div v-if="pass" style="height:700px;">
						<h4>{{ menu[3] }}</h4>  
			
						<!-- 密码输入框 -->
						<van-password-input :value="payPassword" @focus="showKeyboard = true"/>
						<!-- 数字键盘 -->
						<van-number-keyboard :show="showKeyboard" @blur="showKeyboard = false"
							@input="addPassword" @delete="delPassword"/>
							
						<div style="fontSize:12px;color:#A9A9A9;marginTop:20px;">请设置您的支付密码</div>  
					</div>
				</van-col>
			</van-popup>
			
			<!-- 退出登录 -->
			<van-button type="warning" style="marginTop:100px;" @click="logout()">安全退出</van-button>
		</div>
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
import { mapState, mapActions, mapGetters } from 'vuex';// 引入Vuex状态管理
import { Toast } from 'vant';// 引入提示插件
import { Dialog } from'vant';// 引入对话框插件


export default {
  name: 'Me',
  data() {
    return {
        tabarActive:3,// 当前获取焦点的底部栏功能
        photo:'/static/images/photo.jpeg',// 初始用户头像
        menu:['我的信用评分','订单信息','联系人管理','密码设置'],// 功能菜单列表
        shows: false,// 是否展示弹窗遮罩层
        xinyong:false,// 是否展示我的信用评分
        dingdan:false,// 是否展示订单信息
        contact:false,// 是否展示联系人管理
        pass:false,// 是否展示密码设置
		checked: true,// 当前安全模式状态
		payPassword: '',// 支付密码
		showKeyboard: true// 是否显示数字键盘
    }
  },
  computed: {
    ...mapState({
		user_state: state => state.login.user_state,// 用户登录状态
		login_username: state => state.login.login_username,// 登录用户名
		shop_info: state => state.home.shop_info,// 购物车信息
		my_info: state => state.home.my_info,// 我的信息
		community_info: state => state.community.community_info// 社区信息
    })
  },
  methods: {
	// 更改登录状态
	...mapActions(['updateState']),
	// 头像更换
	changePhoto(file) {
		this.photo = file.content;
		Toast('头像更改成功！ ^_^');
	},
	// 展示响应功能弹出层
	listCover(v) {
		this.shows = true;
	
		switch(v) {
			case '我的信用评分' :
				this.dingdan = false;
				this.contact = false;
				this.pass = false;
				this.xinyong = true;
				break;
			case '订单信息' :
				this.contact = false;
				this.pass = false;
				this.xinyong = false;
				this.dingdan = true;
				break;
			case '联系人管理' :
				this.pass = false;
				this.xinyong = false;
				this.dingdan = false;
				this.contact = true;
				break;
			case '密码设置' :
				this.xinyong = false;
				this.dingdan = false;
				this.contact = false;
				this.pass = true;
				break;
			default:
				this.shows = false;
				break;
		}
	},
	// 支付密码输入
	addPassword(key) {
		this.payPassword = (this.payPassword + key).slice(0, 6);
		if((this.payPassword).split('').length >= 6 ) {
			Toast('密码设置成功！')
			this.shows = false
			this.payPassword = ''
			// 保存密码
		}
    },
	// 支付密码移除
    delPassword() {
		this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
    },
	// 安全模式状态更改
	changeSecurity(checked) {
		if(this.checked){
			Dialog.confirm({
				title: '提醒',
				message: '关闭安全模式可能给您带来风险，是否确认关闭？'
			}).then(() => {
				this.checked = checked;
			});
		}else{
			Toast('正在为您护驾中···')
			this.checked = true;
		}
	},
	// 退出登录
	logout(){
		let reslut = {
			login_state: false,
			username: ""
		}
		this.updateState(reslut)
		Toast('已安全退出！ ^_^');
	},
	// 页面重定向
	redirects(url) {
		this.$router.push(url);
	},
  }
}
</script>

<style lang="less" scoped>
	@import url('../assets/css/home.less');
</style>

