<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="username" label="用户名">
				<uni-easyinput placeholder="用户名，不允许重复" v-model="formData.username" trim="both" :disabled="true" />
			</uni-forms-item>
			<uni-forms-item name="nickname" label="昵称">
				<uni-easyinput placeholder="用户昵称" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="gender" label="性别">
				<uni-data-checkbox v-model="formData.gender" :localdata="formOptions.gender_localdata" />
			</uni-forms-item>
			<uni-forms-item name="mobile" label="手机号码">
				<uni-easyinput placeholder="手机号码" v-model="formData.mobile" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="email" label="身份证">
				<uni-easyinput placeholder="身份证号" v-model="formData.email" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="department_id" label="部门">
				<uni-data-picker self-field="_id" parent-field="parent_id" v-model="formData.department_id"
					collection="opendb-department" orderby="name asc" field="_id as value, name as text">
				</uni-data-picker>
			</uni-forms-item>

			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../../js_sdk/validator/uni-id-users1.js';

	const db = uniCloud.database();
	const dbCollectionName = 'uni-id-users';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		data() {
			return {
				formData: {
					"username": "",
					"nickname": "",
					"gender": 0,
					"mobile": "",
					"email": "",
					"department_id": []
				},
				formOptions: {
					"gender_localdata": [{
							"text": "未知",
							"value": 0
						},
						{
							"text": "男",
							"value": 1
						},
						{
							"text": "女",
							"value": 2
						}
					]
				},
				rules: {
					...getValidator(["department_id", "username", "nickname", "gender", "mobile", "email"])
				}
			}
		},
		async onShow() {
			let userInfo = await this.$store.dispatch("user/getUser");
			this.formData = userInfo;
			this.formDataId = userInfo._id;
			// this.getDetail(id)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				value.department_id=[value.department_id];
				db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).field(
					'username,password_secret_version,nickname,gender,status,mobile,mobile_confirmed,email,email_confirmed,avatar,avatar_file,department_id,wx_unionid,wx_openid,ali_openid,apple_openid,dcloud_appid,comment,realname_auth,score,last_login_date,last_login_ip,token,inviter_uid,invite_time,my_invite_code'
					).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		display: flex;
		justify-content: center;
	}

	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}
</style>
