<!-- 蓝色登录页面2 -->
<template>
	<view>
		<view class="img-a">
			<view class="t-b">


				欢迎来到
				<br />
				阜新银行福音系统

			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="login-view" style="">
			<view class="t-login">
				<!-- 	<form class="cl">
					<view class="t-a">
						<text class="txt">账号</text>
						<input type="number" name="phone" placeholder="请输入账号" maxlength="11" v-model="tel" />
					</view>
					<view class="t-a">
						<text class="txt">密码</text>
						<input type="password" name="code" maxlength="18" placeholder="请输入您的密码" v-model="pwd" />
					</view>
					<button @tap="submit">登 录</button>
					<view style="display: flex;flex-direction: row;">
						<view class="reg" @tap="register" style="width: 100%;">注 册</view>
							    <view class="reg" @tap="findpwd">忘记密码</view>			
					</view>

				</form> -->
				<uni-forms ref="form" v-model="formData" :rules="rules" @submit="submit" class="cl">
					<view class="t-a">
						<text class="txt">账户</text>
						<uni-forms-item left-icon="person-filled" labelWidth="35" label-align="center" iconColor="#000"
							name="username">
							<input ref="usernameInput" @confirm="submitForm" type="text" placeholder="账户"
								placeholder-style="#000" v-model="formData.username" />
						</uni-forms-item>
					</view>
					<view class="t-a" style="margin: auto;">
						<text class="txt">密码</text>
						<uni-forms-item left-icon="locked-filled" iconColor="#000" class="icon-container"
							name="password" labelWidth="35" label-align="center">
							<input ref="passwordInput" @confirm="submitForm" :password="showPassword" placeholder="密码"
								placeholder-style="#000" v-model="formData.password" />
							<text class="uni-icon-password-eye pointer" :class="[!showPassword ? 'uni-eye-active' : '']"
								@click="changePassword">&#xe568;</text>
						</uni-forms-item>
					</view>
					<view class="t-a">
						<text class="txt">验证码</text>
						<uni-forms-item v-if="needCaptcha" left-icon="locked-filled" iconColor="#000"
							class="icon-container" name="captcha" labelWidth="35" label-align="center">
							<view style="display: flex;flex-direction: row;">
								<input ref="captchaInput" @confirm="submitForm" type="text" placeholder="验证码"
									placeholder-style="color:#fff" v-model="formData.captcha" />
								<view class="admin-captcha-img pointer" @click="createCaptcha">
									<i v-if="captchaLoading" class="uni-loading"></i>
									<img v-else :src="captchaBase64" width="100%" height="auto"></img>
								</view>
							</view>
						</uni-forms-item>
					</view>
					<button @click="submitForm" type="primary" :loading="loading" :disabled="loading">登 录</button>
					<view style="display: flex;flex-direction: row;">
						<!-- <view class="reg" @tap="register" style="width: 50%;">注 册</view> -->
						<view class="reg" @tap="findpwd" style="width: 100%;">忘记密码</view>
					</view>
				</uni-forms>

			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	import config from '@/admin.config.js'
	import {
		getDeviceUUID
	} from '@/js_sdk/uni-admin/util.js'
	import {
		request
	} from '@/js_sdk/uni-admin/request.js'
	const captchaOptions = {
		deviceId: getDeviceUUID(),
		scene: 'login'
	}
	export default {
		data() {
			return {
				...config.navBar,
				indexPage: config.index.url,
				showPassword: true,
				loading: false,
				formData: {
					username: '',
					password: '',
					captcha: '',
				},
				isLoginPage: true,
				bgType: ['/hybrid/html/index1.html', '/hybrid/html/index2.html', '/hybrid/html/index3.html'],
				bg: '',
				captchaLoading: true,
				needCaptcha: true,
				captchaBase64: '',
				rules: {
					// 对name字段进行必填验证
					username: {
						rules: [{
								required: true,
								errorMessage: '请输入账户',
							},
							{
								minLength: 1,
								maxLength: 30,
								errorMessage: '账户长度在{minLength}到{maxLength}个字符',
							}
						]
					},
					// 对email字段进行必填验证
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入正确的密码',
							},
							{
								minLength: 6,
								errorMessage: '密码长度大于{minLength}个字符',
							}
						]
					},
					// 对email字段进行必填验证
					captcha: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码',
						}]
					},

				}
			}
		},
		async onLoad(id) {
			this.createCaptcha();
		},
		onShow() {},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			...mapActions({
				init: 'app/init'
			}),
			...mapMutations({
				setToken(commit, tokenInfo) {
					commit('user/SET_TOKEN', tokenInfo)
				}
			}),
			submit(event) {
				if (this.loading) {
					return
				}
				const {
					errors,
					value
				} = event.detail
				if (errors) {
					return
				}
				// #ifdef H5
				this.$refs.usernameInput.$refs.input.blur()
				this.$refs.passwordInput.$refs.input.blur()
				this.$refs.captchaInput && this.$refs.captchaInput.$refs.input.blur()
				// #endif
				this.loading = true;
				console.log(value)
				request('login', {
					...value,
					captchaOptions
				}, {
					functionName: 'uni-id-cf',
					showModal: false
				}).then(res => {
					console.log(res);
					uni.setStorageSync('uni_id_token', res.token);
					uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
					this.$u.route({
						url: 'pages/news/news',
						type: 'switchTab',
					});
					// this.setToken({
					//  token: res.token,
					//  tokenExpired: res.tokenExpired
					// })
					// return this.init().then(() => {
					//  uni.showToast({
					//      title: '登录成功',
					//      icon: 'none'
					//  })
					//  uni.setStorage({
					//      key: 'lastUsername',
					//      data: value.username
					//  });
					//  uni.redirectTo({
					//      url: "/pages/news/news",
					//  })
					// })
				}).catch(err => {
					console.log(4444, err);
					if (err.needCaptcha) {
						this.formData.captcha = ''
						this.createCaptcha()
						this.needCaptcha = true
					}
					const that = this
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false,
						success: function() {
							if (err.code === 10101 && that.$refs.usernameInput) {
								that.$refs.usernameInput.$refs.input.focus()
							}
							if (err.code === 10102 && that.$refs.passwordInput) {
								that.$refs.passwordInput.$refs.input.focus()
							}
							if (err.code === 10002 && that.$refs.captchaInput) {
								that.$refs.captchaInput.$refs.input.focus()
							}
						}
					})
				}).finally(err => {
					this.loading = false
				})

			},
			createCaptcha() {
				console.log("createCaptcha");
				this.captchaLoading = true;
				// console.log(request);
				request('createCaptcha', captchaOptions, {
					functionName: 'uni-id-cf'
				}).then(res => {
					if (res.code === 0) {
						this.captchaBase64 = res.captchaBase64
					}
				}).catch(err => {}).finally(err => {
					this.captchaLoading = false
				})
			},
			register() {
				this.$u.route('/pages/login/register');
			},
			findpwd() {
				this.$u.route('/pages/login/findpwd');
			},
			confirmForm(name, value) {
				// this.binddata(name, value)
				this.submitForm()
			},
			submitForm() {
				this.$refs.form.submit()
			},
			initAdmin() {
				uni.redirectTo({
					url: '/pages/demo/init/init'
				})
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// #ifdef H5
			focus: function() {
				this.$refs.usernameInput.$refs.input.focus()
			},
			// #endif
		}
	};
</script>
<style>
	.txt {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.img-a {
		width: 100%;
		height: 450rpx;
		background-image: url(../../static/login/static/head.png);
		background-size: 100%;
	}

	.reg {
		width: 50%;
		font-size: 28rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30rpx;
	}

	.login-view {
		width: 100%;
		position: relative;
		margin-top: -120rpx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 80rpx;
	}

	.t-login button {
		font-size: 28rpx;
		background: #2796f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
	}

	.t-login input {
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		border-bottom: 1px solid #e9e9e9;
		font-size: 28rpx;
	}

	.t-login .t-a {
		height: 80px;
		margin-top: 10px;
		position: relative;
	}

	.t-b {
		text-align: left;
		font-size: 42rpx;
		color: #ffffff;
		padding: 130rpx 0 0 80rpx;
		font-weight: bold;
		line-height: 70rpx;

	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 150rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
</style>
