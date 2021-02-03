<!-- 登录注册组件 -->
<template>
  <div id="apps">
		<div class="login">
			<!-- 欢迎提示 -->
			<div class="welcome">
				<img src="/static/images/welcome.png">
			</div>
			<!-- 注册表单 -->
			<div class="login-form">
				<div class="login-inp">
					<label>用户名</label>
					<input type="text" placeholder="请输入用户名" v-model="username" @blur="rules(username, 'user')"/>
				</div>
				<div class="login-inp">
					<label>密码</label>
					<input type="password" placeholder="请输入密码" v-model="password" @blur="rules(password, 'pass')"/>
				</div>
				<div class="login-inp">
					<label>确认密码</label>
					<input type="password" placeholder="请再次输入密码" v-model="repassword" @blur="rules(repassword, 'repass')"/>
				</div>
				<div class="login-inp">
					<a href="#" @click="submit()">注册</a>
				</div>
			</div>
			<!-- 登录提示 -->
			<div class="login-txt">
				<a href="#" @click="redirects('/login')">已有账号？立即登录</a>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';// 引入状态管理
import { Toast } from 'vant'; // 引入提示插件


export default {
  name: 'register',
  data() {
    return {
		username: '',//用户名
		password: '',//密码
		repassword: '',//二次输入密码
		flag: [false, false, false]//校验验证
    }
  },
  computed: {
	// 已存在的用户列表
    ...mapState({
		user_list: state => state.login.user_list
    })
  },
  methods: {
	// 添加用户
    ...mapActions(['addUser']),
    // 用户名和密码的验证
    rules(value, type){
        if(type == 'user') {
            let username = value.trim();
            let uPattern = /^[a-zA-Z0-9_]{4,12}$/g;

            if(!uPattern.test(username)) {
                Toast('请设置4到16位用户名(包含字母,数字,下划线)！')
				this.flag[0] = false
            }else{
				this.flag[0] = true
			}
        }else if(type == 'pass') {
            let password = value.trim();
            let pPattern = /^[a-zA-Z0-9_]{6,}$/g;
			
            if(!pPattern.test(password)) {
                Toast('请设置至少6位密码(包含字母,数字,下划线)！')
				this.flag[1] = false
            }else{
				this.flag[1] = true
			}
        }else if(type == 'repass') {
			let password = this.password.trim();
			let repassword = value.trim()
			
			if(password !== repassword) {
				Toast('两次密码输入不一致！');
				this.flag[2] = false
			}else{
				this.flag[2] = true
			}
		} 
    },
	// 注册提交
    submit() {
        let data = {
            username: this.username,
            password: this.password
        }
		
		// 校验用户信息是否存在
		var exist = false
		this.user_list.forEach(user => {
			if(user.username === data.username){
				exist = true
			}
		})
		
        if(this.flag.includes(false)) {
            Toast('请检查输入的内容！')
        }else if(exist == true){
			Toast('该用户已存在！')
		}else{
            this.addUser(data)
			this.username = ''
			this.password = ''
			this.repassword = ''
			Toast('注册成功！')
        }
    },
	// 页面跳转
    redirects(url) {
		this.$router.push(url);
    }
  }
}
</script>

<style lang="less" scoped>
	@import url('../assets/css/login.less');
</style>

