<template>
	<view class="content">
		<!-- 顶部文字 -->
		<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
		<text>密码至少包含大写字母，小写字母，数字，且不少于6位</text>
		<uni-forms ref="form" :value="formData" :rules="rules">
				<!-- focus规则如果上一页携带来“手机号码”数据就focus验证码输入框，否则focus手机号码输入框 -->
	<!-- 		<uni-forms-item name="phone">
			
				<uni-easyinput :disabled="lock" :focus="formData.phone.length!=11" type="number" class="easyinput" :inputBorder="false"
					v-model="formData.phone" maxlength="11" placeholder="请输入手机号"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="code">
				<uni-easyinput :focus="formData.phone.length==11" type="number" class="easyinput" :inputBorder="false"
					v-model="formData.code" maxlength="6" placeholder="请输入验证码">
					<template slot="right">
						<uni-send-sms-code ref="shortCode" :phone="formData.phone"></uni-send-sms-code>
					</template>
				</uni-easyinput>
			</uni-forms-item> -->
			<uni-forms-item name="pwd">
				<uni-easyinput type="password" class="easyinput" :inputBorder="false" v-model="formData.pwd"
					placeholder="请输入新密码"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="pwd2">
				<uni-easyinput type="password" class="easyinput" :inputBorder="false" v-model="formData.pwd2"
					placeholder="请确认新密码"></uni-easyinput>
			</uni-forms-item>
			<button class="send-btn-box" :disabled="!canSubmit" :type="canSubmit?'primary':'default'"
				@click="submit">完成</button>
		</uni-forms>
	</view>
</template>

<script>
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				lock:false,
				formData: {
					"phone": "",
					'pwd': '',
					'pwd2': ''
				},
				rules: {
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号',
							},
							{
								pattern: /^1\d{10}$/,
								errorMessage: '手机号格式不正确',
							}
						]
					},
					code: {
						rules: [{
								required: true,
								errorMessage: '请输入验证码',
							},
							{
								pattern: /^.{6}$/,
								errorMessage: '请输入6位验证码',
							}
						]
					},
					pwd: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/,
								errorMessage: '密码至少包含大写字母，小写字母，数字，且不少于6位',
							}
						]
					},
					pwd2: {
						rules: [{
								required: true,
								errorMessage: '请确认密码',
							},
							{
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/,
								errorMessage: '密码至少包含大写字母，小写字母，数字，且不少于6位',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									console.log(value);
									if (value != data.pwd) {
										callback('两次输入密码不一致')
									};
									return true
								}
							}
						]
					}
				}
			}
		},
		computed: {
			canSubmit() {
				return  this.isPwd ;
			},
			// isPhone() {
			// 	let reg_phone = /^1\d{10}$/;
			// 	let isPhone = reg_phone.test(this.formData.phone);
			// 	return isPhone;
			// },
			isPwd() {
				let reg_pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
				let isPwd = reg_pwd.test(this.formData.pwd);
				let isPwd1 = reg_pwd.test(this.formData.pwd2);
				let isPwd2 = this.formData.pwd==this.formData.pwd2;
				return isPwd&&isPwd1&&isPwd2;
			},
			isCode() {
				let reg_code = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
				let isCode = reg_code.test(this.formData.code);
			}
		},
		onLoad(event) {
			// if (event && event.phoneNumber) {
			// 	this.formData.phone = event.phoneNumber;
			// 	this.lock = true
			// }
		},
		onReady() {
			if (this.formData.phone) {
				this.$refs.shortCode.start();
			}
		},
		methods: {
			/**
			 * 完成并提交
			 */
			async submit() {
				uni.showLoading();
		        console.log(this.formData);
				let userInfo = await this.$store.dispatch("user/getUser");
				let result=await this.$util.cloudFunction("user","resetPwd",{
					"uid":userInfo._id,
					"password":this.formData.pwd,
					}
					);
				uni.hideLoading();
				console.log(result)
				if (result.code!=0){
					console.log(111111111111)
					uni.showModal({
						content: result.msg ,
						showCancel: false
					})
				}else{
					uni.showToast({
						title: "修改成功，请重新登录!"
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.redirectTo({
						url: '/pages/login/login'
					}), 2000);
					
				}
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.content{
		padding-top: 36rpx;
	}
</style>
