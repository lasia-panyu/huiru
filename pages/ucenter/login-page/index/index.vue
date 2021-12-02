<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">登录后即可展示自己</text>
		<!-- 登录框 -->
		<view v-if="['apple','weixin'].includes(type)" class="quickLogin">
			<image @click="quickLogin" :src="imgSrc" mode="widthFix" class="quickLoginBtn"></image>
			<uni-agreements @setAgree="agree = $event"></uni-agreements>
		</view>
		<template v-else>
			<input type="number" class="input-box" :inputBorder="false" v-model="phone" maxlength="11"
				placeholder="请输入手机号" />
			<uni-agreements @setAgree="agree = $event"></uni-agreements>
			<button class="get-code" :disabled="!isPhone" :type="isPhone?'primary':'default'"
				@click="sendShortMsg">获取短信验证码</button>
			<text class="tip">未注册的手机号验证通过后将自动注册</text>
		</template>
		
		<!-- 快捷登录按钮弹窗 -->
		<uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login>
	</view>
</template>

<script>
	let currentWebview; //是否一键登录优先
	export default {
		data() {
			return {
				type:"",
				phone: "",
				agree: false
			}
		},
		computed: {
			loginConfig() {
				return getApp().globalData.config.router.login
			},
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
			imgSrc(){
				return '/static/login-index/'+this.type+'.png'
			}
		},
		onLoad(e) {
			this.type = e.type
			
			//是否优先启动一键登录。即：页面一加载就启动一键登录
			//#ifdef APP-PLUS
			if (this.type == "univerify") {
				const pages = getCurrentPages();
				currentWebview = pages[pages.length - 1].$getAppWebview();
				currentWebview.setStyle({
					"top": "2000px" //隐藏当前页面窗体
				})
			}
			//#endif
		},
		onReady() {
			//#ifdef APP-PLUS
			if (this.type == "univerify") {
				this.type == loginConfig[1]
				// console.log('开始一键登录');
				setTimeout(() => {
					this.$refs.uniQuickLogin.login_before('univerify')
				}, 100)
				setTimeout(() => {
					currentWebview.setStyle({
						titleNView: {
							autoBackButton: true,
							backgroundColor: "#FFFFFF"
						}
					})
					currentWebview.setStyle({
						"top": "0"
					})
				}, 1500);
			}
			//#endif
		},
		methods: {
			quickLogin(){
				this.$refs.uniQuickLogin.login_before(this.type)
			},
			sendShortMsg() {
				if (!this.agree) {
					return uni.showToast({
						title: '你未同意隐私政策协议',
						icon: 'none'
					});
				}
				// 发送验证吗
				uni.showLoading();
				uni.navigateTo({
					url: '/pages/ucenter/login-page/phone-code/phone-code?phoneNumber=' + this.phone,
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			//去密码登录页
			toPwdLogin() {
				uni.navigateTo({
					url: '../pwd-login/pwd-login'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../common/login-page.css");
	.quickLogin{
		width: 650rpx;
		height: 350px;
		align-items: center;
		justify-content: center;
	}
	.quickLoginBtn{
		margin:20px 0;
		width: 450rpx;
	}
</style>