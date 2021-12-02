<!-- 蓝色登录页面2 -->
<template>
	<view>
		<view class="img-a">
			<view class="t-b">
				欢迎使用
				<br />
				阜新银行党建系统
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
					<view class="reg" @tap="register">注 册</view>
				</form> -->
				<uni-forms ref="form" v-model="formData" :rules="rules" @submit="submit">
					<uni-forms-item left-icon="person-filled" iconColor="#fff" name="username" labelWidth="35"
						label-align="center">
						<input ref="usernameInput" @confirm="submitForm" class="uni-input-border" type="text"
							placeholder="账户" placeholder-style="color:#fff" v-model="formData.username" />
					</uni-forms-item>
					<uni-forms-item left-icon="locked-filled" iconColor="#fff" class="icon-container" name="password"
						labelWidth="35" label-align="center">
						<input ref="passwordInput" @confirm="submitForm" class="uni-input-border"
							:password="showPassword" placeholder="密码" placeholder-style="color:#fff"
							v-model="formData.password" />
						<text class="uni-icon-password-eye pointer" :class="[!showPassword ? 'uni-eye-active' : '']"
							@click="changePassword">&#xe568;</text>
					</uni-forms-item>
					<uni-forms-item v-if="needCaptcha" left-icon="person-filled" iconColor="#fff" class="icon-container"
						name="captcha" labelWidth="35" label-align="center">
						<input ref="captchaInput" @confirm="submitForm" class="uni-input-border" type="text"
							placeholder="验证码" placeholder-style="color:#fff" v-model="formData.captcha" />
						<view class="admin-captcha-img pointer" @click="createCaptcha">
							<i v-if="captchaLoading" class="uni-loading"></i>
							<img v-else :src="captchaBase64" width="100%" height="100%"></img>
						</view>
					</uni-forms-item>
					<view class="uni-button-group">
						<button class="uni-button uni-button-full" type="primary" :loading="loading" :disabled="loading"
							@click="submitForm">登录</button>
					</view>
				</uni-forms>

			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			//取保存的用户名密码（如果有）带入输入框
			let aa = uni.getStorageSync('uname');
			let bb = uni.getStorageSync('upwd')
			return {
				tel: aa,
				pwd: bb,
			}
		},
		onLoad(id) {
			let that = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {
					console.log(that.$util);
					console.log(res);
					that.$util.systeminfo = res;

				},
			})
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

			register() {
				this.$u.route('/pages/login/register');
			},
			async submit() {
				console.log(this.tel)
				console.log(this.pwd)
				let res = await this.$util.post('Userlogin', {
					tellerid: this.tel,
					passwd: this.pwd
				})
				console.log(res);
				console.log(res.length)
				if (res == 'err' || res == undefined) {
					this.$util.toast(this.$refs, "请求失败请重新尝试", true, 'error');
				} else if (res.length == 1) {
					this.$util.toast(this.$refs, res[0]['rspCode'] + ':' + res[0]['rspMsg'], true, 'error');
				} else if (res.length == 2) {
					console.log(res[0])
					this.$util.account = res[0];
					uni.setStorageSync("account", res[0]);
					//保存用户名和密码，重新登录时带入
					let uname = this.tel;
					let upwd = this.pwd;
					uni.setStorageSync("uname", uname);
					uni.setStorageSync("upwd", upwd);
					//保存用户名密码结束
					this.$u.route({
						url: 'pages/index/index',
						type: 'switchTab',
					});

				}
			}
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
		position: relative;
	}

	.t-b {
		text-align: left;
		font-size: 42rpx;
		color: #ffffff;
		padding: 130rpx 0 0 70rpx;
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
