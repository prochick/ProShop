// 登录信息存储
export default {
    state:{
		// 已注册用户列表
        user_list: [
			{ username:'admin', password:'admin'}
		],
		// 用户登录状态
		user_state: false,
		// 登录用户名
		login_username:'admin'
    },
	mutations:{
		// 添加用户
		add(state, user){
			state.user_list.push(user)
		},
		// 更改用户登录状态
		updateState(state, user_state, login_username){
			state.user_state = user_state
			state.login_username = login_username
		}
	},
	actions:{
		addUser(context, user_info){
			context.commit('add', user_info)
		},
		updateState(context, param){
			context.commit('updateState', param.login_state, param.username)
		}
	}
}