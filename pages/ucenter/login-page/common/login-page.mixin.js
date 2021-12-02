import {mapMutations} from 'vuex';
import loginSuccess from './loginSuccess.js';
let mixin = {
	methods:{
		...mapMutations({
			setUserInfo: 'user/login'
		}),
		loginSuccess(result){
			loginSuccess(result)
			delete result.userInfo.token
			this.setUserInfo(result.userInfo)
		}
	}
}
export default mixin