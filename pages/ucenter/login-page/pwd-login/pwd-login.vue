<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">用户名密码登录</text>
		<input class="input-box" :inputBorder="false" v-model="username" placeholder="请输入手机号/用户名"></input>
		<input type="password" class="input-box" :inputBorder="false" v-model="password" placeholder="请输入密码"></input>
		<view class="captcha-box" v-if="captchaBase64">
			<image class="captcha-img" @click="createCaptcha" :src="captchaBase64" mode="widthFix"></image>
			<input type="text" class="input-box captcha" :inputBorder="false" v-model="captcha" placeholder="请输入验证码"></input>
		</view>
		<uni-agreements @setAgree="agree = $event"></uni-agreements>
		<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
			@click="pwdLogin">登录</button>
		<!-- 忘记密码 -->
		<view class="auth-box">
			<text class="link" @click="toRetrievePwd">忘记密码</text>
			<text class="link" @click="toRegister">注册账号</text>
		</view>
		<uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				"password": "",
				"username": "",
				"agree": false,
				"captchaBase64":"",
				"captcha":""
			}
		},
		computed: {
			canLogin() {
				return this.username.length && this.isPwd;
			},
			isPwd() {
				return /^.{6,20}$/.test(this.password);
			},
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
		},
		onLoad(){
			this.createCaptcha();
		},
		methods: {
			// 页面跳转，找回密码
			toRetrievePwd() {
				uni.navigateTo({
					url: '../pwd-retrieve/pwd-retrieve?phoneNumber=' + (this.isPhone ? this.username : '') +
						'&phoneArea=' + this.currenPhoneArea
				})
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.agree) {
					return uni.showToast({
						title: '你未同意隐私政策协议',
						icon: 'none'
					});
				}
				// 下边是可以登录
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'login',
						params:{
							"username": this.username,
							"password": this.password,
							"captcha":this.captcha
						},
					},
					success: ({result}) => {
						console.log(result);
						if (result.code === 0) {
							this.loginSuccess(result)
						} else {
							if (result.needCaptcha) {
								uni.showToast({
									title: result.msg,
									icon: 'none'
								});
								this.createCaptcha()
							}else{
								uni.showModal({
									title: '错误',
									content: result.msg,
									showCancel: false,
									confirmText: '知道了'
								});
							}
						}
					}
				})
			},
			createCaptcha(){
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'createCaptcha',
						params:{
							scene: "login"
						},
					},
					success: ({result}) => {
						if (result.code === 0) {
							this.captchaBase64 = result.captchaBase64
						}else{
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			},
			/* 前往注册 */
			toRegister(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/ucenter/login-page/register/register'
				})
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.auth-box {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.auth-box .link {
		font-size: 26rpx;
	}

	.login-text-sub {
		color: #8a8f8b;
	}

	.toRegister {
		margin-top: 80px;
		width: 600rpx;
	}
	.captcha-box{
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.captcha-img{
		margin:auto;
		width: 250rpx;
	}
	.captcha{
		margin:auto;
		width: 350rpx;
	}
</style>
