// 上次启动时的用户信息
import util from "../../common/util.js"
let userInfoHistory = uni.getStorageSync('userInfo') || {};
let userInfo;

let state = {
		//是否已经登录
		hasLogin: Boolean(Object.keys(userInfoHistory).length),
		//用户信息
		info: userInfoHistory
	},
	getters = {
		info(state) {
			return state.info;
		},
		hasLogin(state){
			return state.hasLogin;
		}
	},
	mutations = {
		login(state, info) { //登录成功后的操作
			//原有的结合传来的参数
			let _info = state.info;
			state.info = Object.assign({}, _info, info);
			//设置为已经登录
			state.hasLogin = true;
			console.log('state.info',state.info);
			//存储最新的用户数据到本地持久化存储
			uni.setStorageSync('userInfo', state.info);
			uni.setStorageSync('uni_id_token', state.info.token)
			uni.setStorageSync('uni_id_token_expired', state.info.tokenExpired)
			
		},
		logout(state) {
			state.info = {};
			state.hasLogin = false;
			uni.setStorageSync('userInfo', {});
			uni.setStorageSync('uni_id_token', '');
			uni.setStorageSync('uni_id_token_expired', 0)
		},
		setUserInfo(userInfo){
			state.userInfo = userInfo;
		}
	},
	actions = {
        async getUser(){
			let userInfo =await  util.getUser({});
			return userInfo;
		}
	}
export default {
	state,
	getters,
	mutations,
	actions
}