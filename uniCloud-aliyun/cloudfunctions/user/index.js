'use strict';
const uniID = require('uni-id')
const db = uniCloud.database();
const dbCollectionName = 'uni-id-users';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + JSON.stringify(event))

	if (event.action == "resetPwd") {
		const payload = await uniID.checkToken(event.uniIdToken)
		if (payload.code) {
			return payload
		}
		if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(event.param.password)){
		    return {
		      code: 401,
		      msg: '密码至少包含大写字母，小写字母，数字，且不少于6位'
		    }
        }
		const res = await uniID.resetPwd(event.param)
		return res
	}
	
	if (event.action == "resetPwdL") {
		// const payload = await uniID.checkToken(event.uniIdToken)
		// if (payload.code) {
		// 	return payload
		// }
		console.log(event.param);
		if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(event.param.password)){
		    return {
		      code: 401,
		      msg: '密码至少包含大写字母，小写字母，数字，且不少于6位'
		    }
	    }
		const res = await uniID.resetPwd(event.param)
		let user={
			"nickname":event.param.nickname,
			"mobile":event.param.mobile,
			"email":event.param.email
		};
		if(res.code==0){
			console.log(event.param.uid);
			let result=db.collection(dbCollectionName).doc(event.param.uid).update(user);
			console.log(result);
		}else{
			return {
			  code: 404,
			  msg: '更新用户信息失败!'
			}
		}
		return res
	}
	if (event.action == "add") {
		if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(event.param.password)){
		    return {
		      code: 401,
		      msg: '密码至少包含大写字母，小写字母，数字，且不少于6位'
		    }
	    }
		const res = await uniID.register(event.param)
		return res
	}
	//返回数据给客户端
	return event
};
