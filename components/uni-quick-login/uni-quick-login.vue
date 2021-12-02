<template>
	<view class="quick-login-box">
		<view class="item" v-for="(item,index) in servicesList" :key="index"
			@click="item.path?to(item.path):login_before(item.id,false)">
			<image class="logo" :src="item.logo" mode="widthFix"></image>
			<text class="login-title">{{item.text}}</text>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	//前一个窗口的页面地址。控制点击切换快捷登录方式是创建还是返回
	import loginSuccess from '@/pages/ucenter/login-page/common/loginSuccess.js';
	export default {
		computed: {
			loginConfig() {
				return getApp().globalData.config.router.login
			},
			agreements() {
				return getApp().globalData.config.about.agreements || []
			}
		},
		data() {
			return {
				servicesList: [{
						"id": "username",
						"text": "账号登录",
						"logo": "/static/uni-quick-login/user.png",
						"path": "/pages/ucenter/login-page/pwd-login/pwd-login"
					},
					{
						"id": "smsCode",
						"text": "短信验证码",
						"logo": "/static/uni-quick-login/sms.png",
						"path": "/pages/ucenter/login-page/index/index?type=smsCode"
					},
					{
						"id": "weixin",
						"text": "微信登录",
						"logo": "/static/uni-quick-login/wechat.png",
					},
					{
						"id": "apple",
						"text": "苹果登录",
						"logo": "/static/uni-quick-login/apple.png",
					},
					{
						"id": "univerify",
						"text": "一键登录",
						"logo": "/static/uni-quick-login/univerify.png",
					},
					{
						"id": "qq",
						"text": "QQ登录", //暂未提供该登录方式的接口示例
						"logo": "/static/uni-quick-login/univerify.png",
					},
					{
						"id": "xiaomi",
						"text": "小米登录", //暂未提供该登录方式的接口示例
						"logo": "/static/uni-quick-login/univerify.png",
					},
					{
						"id": "sinaweibo",
						"text": "微博登录", //暂未提供该登录方式的接口示例
						"logo": "/static/uni-quick-login/univerify.png",
					}
				],
				oauthServices: [],
				config: {},
				univerifyStyle: { //一键登录弹出窗的样式配置参数
					"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
					"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
					"buttons": { // 自定义登陆按钮
						"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
						"list": []
					},
					"privacyTerms": {
						"defaultCheckBoxState": false, // 条款勾选框初始状态 默认值： true   
						"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
						"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
						"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
						"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
						"privacyItems": []
					}
				}
			}
		},
		watch: {
			agree(agree) {
				this.univerifyStyle.privacyTerms.defaultCheckBoxState = agree
			}
		},
		props: {
			agree: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		async created() {
			let servicesList = this.servicesList
			//去掉配置中不存在的
			servicesList = servicesList.filter(item => this.loginConfig.includes(item.id))
			//处理一键登录
			if(this.loginConfig.includes('univerify')){
				this.univerifyStyle.privacyTerms.privacyItems = this.agreements
				//设置一键登录功能底下的快捷登陆按钮
				servicesList.forEach(({id,logo}) => {
					if (id != 'univerify') {
						this.univerifyStyle.buttons.list.push({
							"iconPath": logo,
							"provider": id
						})
					}
				})
			}
			//如果当前页面为默认登陆界面。当前第一优先级的“微信和苹果登陆”要隐藏，因为他已经被渲染在默认登陆界面顶部
			if (
				this.getRoute(1) == '/pages/ucenter/login-page/index/index' &&
				['weixin','apple'].includes(this.loginConfig[0])
			) {
				servicesList = servicesList.filter(item => item.id != this.loginConfig[0])
			}
			//去掉当前页面对应的登录选项
			this.servicesList = servicesList.filter(item => {
				let path = item.path?item.path.split('?')[0]:'';
				return path != this.getRoute(1)
			})
			console.log('servicesList', servicesList, this.servicesList);
		},
		mounted() {
			// #ifdef APP-PLUS
			plus.oauth.getServices(oauthServices => {
				this.oauthServices = oauthServices
			}, err => {
				uni.showModal({
					title: '获取服务供应商失败：' + JSON.stringify(err),
					showCancel: false,
					confirmText: '知道了'
				});
				console.error('获取服务供应商失败：' + JSON.stringify(err));
			})
			// #endif
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			getRoute(n = 0) {
				let pages = getCurrentPages();
				// console.log('route-pages-length', pages.length);
				if (n > pages.length) {
					return ''
				}
				return '/' + pages[pages.length - n].route
			},
			to(path) {
				// console.log('比较', this.getRoute(2), path)
				if (this.getRoute(2) == path) { // 控制路由是重新打开还是返回，避免重复打开页面
					uni.navigateBack();
				} else {
					uni.navigateTo({
						url: path,
						animationType: 'slide-in-left'
					})
				}
			},
			login_before(type, navigateBack = true) {
				if (!this.agree && type != 'univerify') {
					return uni.showToast({
						title: '你未同意隐私政策协议',
						icon: 'none'
					});
				}
				uni.showLoading({
					mask: true
				})
				// console.log(arguments);
				let oauthService = this.oauthServices.find((service) => service.id == type)
				// console.log(type);

				// #ifdef APP-PLUS
				//请勿直接使用前端获取的unionid或openid直接用于登录，前端的数据都是不可靠的
				if (type == 'weixin') {
					return oauthService.authorize(({
							code
						}) => {
							// console.log(code);
							this.login({
								code
							}, type)
						},
						err => {
							uni.hideLoading()
							console.error(err);
							uni.showModal({
								content: JSON.stringify(err),
								showCancel: false
							});
						})
				}
				// #endif

				uni.login({
					"provider": type,
					"univerifyStyle": this.univerifyStyle,
					complete: (e) => {
						console.log(e);
					},
					success: async e => {
						console.log(e);
						if (type == 'apple') {
							let res = await this.getUserInfo({
								provider: "apple"
							})
							uni.hideLoading()
							Object.assign(e.authResult, res.userInfo)
						}
						// #ifdef MP-WEIXIN
						if (type == 'weixin') {
							return this.login({
								code: e.code
							}, type)
						}
						// #endif
						this.login(e.authResult, type)
					},
					fail: (err) => {
						uni.hideLoading()
						console.error(err);

						if (type == 'univerify') {
							if (err.metadata && err.metadata.error_data) {
								uni.showToast({
									title: "一键登录:" + err.metadata.error_data,
									icon: 'none'
								});
							}
							if (err.errMsg) {
								uni.showToast({
									title: "一键登录:" + err.errMsg,
									icon: 'none'
								});
							}
							switch (err.errCode) {
								case 30002:
									console.log('在一键登录界面，点击其他登录方式');
									break;
								case 30003:
									console.log('关闭了登录');
									if (navigateBack) {
										uni.navigateBack()
									}
									break;
								case 30006:
									uni.showModal({
										title: "登录服务初始化错误",
										content: err.metadata.error_data,
										showCancel: false,
										confirmText: '知道了',
									});
									break;
								case "30008":
									uni.showToast({
										title: '点击了第三方登陆',
										icon: 'none'
									});
									console.log('点击了第三方登陆，provider：', err.provider);
									let {
										path
									} = this.servicesList.find(item => item.id == err.provider) || {}
									console.log('path', path);
									if (path && path != this.getRoute(1)) { //存在路径，且并不是当前已经打开的路径
										this.to(path)
									} else {
										this.login_before(err.provider)
									}
									break;
								default:
									console.log(9527, err);
									break;
							}
						}
					}
				})
			},
			login(params, type) { //联网验证登录
				console.log({params,type});
				let action = 'loginBy' + type.trim().toLowerCase().replace(type[0], type[0].toUpperCase())
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action,
						params
					},
					success: ({
						result
					}) => {
						console.log("login-result",result);
						if (result.code === 0) {
							if (type == 'univerify') {
								uni.closeAuthView()
							}
							uni.hideLoading()
							loginSuccess(result)
							delete result.userInfo.token
							this.setUserInfo(result.userInfo)
						} else {
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			async getUserInfo(e) {
				return new Promise((resolve, reject) => {
					uni.getUserInfo({
						...e,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							uni.showModal({
								content: JSON.stringify(err),
								showCancel: false
							});
							reject(err);
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.quick-login-box {
		flex-direction: row;
		width: 750rpx;
		justify-content: space-around;
		position: fixed;
		bottom: 10rpx;
		left: 0;
	}

	.item {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200rpx;
	}

	.logo {
		width: 60rpx;
		height: 60rpx;
	}

	.login-title {
		margin-top: 4px;
		font-size: 26rpx;
	}
</style>
