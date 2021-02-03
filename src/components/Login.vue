<!-- 登录注册组件 -->
<template>
  <div id="apps">
		<div class="login">
			<!-- 欢迎提示 -->
			<div class="welcome">
				<img src="/static/images/welcome.png">
			</div>
			<!-- 登录表单 -->
			<div class="login-form">
				<div class="login-inp">
					<label>用户名</label>
					<input type="text" placeholder="请输入用户名" v-model="username"/>
				</div>
				<div class="login-inp">
					<label>密码</label>
					<input type="password" placeholder="请输入密码" v-model="password"/>
				</div>
				<div class="login-inp">
					<a href="#" @click="submit()">登录</a>
				</div>
			</div>
			<!-- 注册提示 -->
			<div class="login-txt">
				<a href="#" @click="redirects('/register')">立即注册</a>
				|
				<a href="#" @click="tip()">忘记密码？</a>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';// 引入状态管理
import { Toast } from 'vant';// 引入提示插件


export default {
  name: 'login',
  data() {
    return {
       username: '',// 用户名
       password: ''// 密码
    }
  },
  computed: {
	// 已存在的用户列表
    ...mapState({
		user_list: state => state.login.user_list
    })
  },
  methods: {
	// 更改登录状态
    ...mapActions(['updateState']),
	// 登录提交
    submit() {
        let data = {
            username: this.username,
            password: this.password
        }

        if(data.username == '' || data.password == '' ) {
            Toast('用户名和密码都不能为空！')
        }else{
			var flag = false
			// 校验用户名和密码是否存在
			this.user_list.forEach(user => {
				if(user.username === data.username && user.password === data.password){
					flag = true
				}
			})
			
			// 校验成功则返回首页否则提示错误
			if(flag) {
				let reslut = {
					login_state: true,
					username: data.username
				}
				this.updateState(reslut)
				this.redirects('/')
				Toast('登录成功！');
			}else{
				Toast('用户名或密码错误！')
			}
        }
    },
	// 页面跳转
    redirects(url) {
		this.$router.push(url);
    },
    tip() {
        Toast('该功能正在维护 o(╥﹏╥)o');
    }
  }
}
</script>

<style lang="less" scoped>
	@import url('../assets/css/login.less');
</style>

