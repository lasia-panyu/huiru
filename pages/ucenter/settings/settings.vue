<template>
	<view class="content">
		<!-- 功能列表 -->
		<uni-list class="mt10" :border="false">
			<uni-list-item title="个人资料" to="/pages/ucenter/userinfo/userinfo" link="navigateTo"></uni-list-item>
			<!-- <uni-list-item v-if="userInfo.mobile" title="修改密码" :to="'/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber='+ userInfo.mobile" link="navigateTo"></uni-list-item>
		 -->
		</uni-list>
		<!-- #ifndef H5 -->
		<uni-list class="mt10" :border="false">
			<!-- #ifdef APP-PLUS -->
			<!-- 检查push过程未结束不显示，push设置项 -->
			<uni-list-item title="清理缓存" @click="clearTmp" link></uni-list-item>
			<!-- <uni-list-item v-if="pushIsOn != 'wait'" @click.native="pushIsOn?pushServer.off():pushServer.on()" title="推送功能" showSwitch :switchChecked="pushIsOn"></uni-list-item>
			 -->
			<!-- #endif -->
		<!-- 	<uni-list-item v-if="supportMode.includes('fingerPrint')" title="指纹解锁" @click.native="startSoterAuthentication('fingerPrint')" link></uni-list-item>
			<uni-list-item v-if="supportMode.includes('facial')" title="人脸解锁" @click="startSoterAuthentication('facial')" link></uni-list-item>
		 -->
		</uni-list>
		<!-- #endif -->
		
		<!-- 退出/登录 按钮 -->
		<view class="bottom-back" @click="clickLogout">
			<text class="bottom-back-text" >退出登录</text>
		<!-- 	<text class="bottom-back-text" v-else>登录</text> -->
		</view>
	</view>
</template>

<script>
	import pushServer from './dc-push/push.js';
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				pushServer:pushServer,
				supportMode:[],
				pushIsOn:"wait"
			}
		},
		computed: {
			...mapGetters({
				'userInfo': 'user/info',
				'hasLogin': 'user/hasLogin',
			})
		},
		onLoad() {
			// #ifdef APP-PLUS || MP-WEIXIN
			uni.checkIsSupportSoterAuthentication({
				success: (res) => {
					console.log(res);
					this.supportMode = res.supportMode
				},
				fail: (err) => {
					console.log(err);
				}
			})
			// #endif
		},
		onShow() {
			// 检查手机端获取推送是否开启
			//#ifdef APP-PLUS
			setTimeout(()=>{
				this.pushIsOn = pushServer.isOn();
			},300)
			//#endif
		},
		methods: {
			...mapMutations({
				logout: 'user/logout'
			}),
			toEdit() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				});
			},
			changePwd() {
				uni.navigateTo({
					url: '/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve?phoneNumber='
						+ (this.userInfo && this.userInfo.mobile ? this.userInfo.mobile : ''),
					fail: err => {
						console.log(err);
					}
				});
			},
			/**
			 * 开始生物认证
			 */
			startSoterAuthentication(checkAuthMode) {
				console.log(checkAuthMode);
				let title = {"fingerPrint":"指纹解锁","facial":"人脸解锁"}[checkAuthMode]
				// 检查是否开启认证
				this.checkIsSoterEnrolledInDevice({checkAuthMode,title})
					.then(() => {
						console.log(checkAuthMode,title);
						// 开始认证
						uni.startSoterAuthentication({
							requestAuthModes: [checkAuthMode],
							challenge: '123456', // 微信端挑战因子
							authContent: `请用${title}`,
							complete: (res) => {
								console.log(res);
							},
							success: (res) => {
								console.log(res);
								if (res.errCode == 0) {
									/**
									 * 验证成功后开启自己的业务逻辑
									 * 
									 * app端以此为依据 验证成功
									 * 
									 * 微信小程序需要再次通过后台验证resultJSON与resultJSONSignature获取最终结果
									 */
									return uni.showToast({
										title: `${title}成功`,
										icon: 'none'
									});
								}
								uni.showToast({
									title: '认证失败请重试',
									icon: 'none'
								});
							},
							fail: (err) => {
								console.log(err);
								console.log(`认证失败:${err.errCode}`);
								uni.showToast({
									title: `认证失败`,
									icon: 'none'
								});
							}
						})
					})
			},
			checkIsSoterEnrolledInDevice({checkAuthMode,title}) {
				return new Promise((resolve, reject) => {
					uni.checkIsSoterEnrolledInDevice({
						checkAuthMode,
						success: (res) => {
							console.log(res);
							if (res.isEnrolled) {
								return resolve(res);
							}
							uni.showToast({
								title: `设备未开启${title}`,
								icon: 'none'
							});
							reject(res);
						},
						fail: (err) => {
							console.log(err);
							uni.showToast({
								title: `${title}失败`,
								icon: 'none'
							});
							reject(err);
						}
					})
				})
			},
			clickLogout() {
					uni.showModal({
						title: '提示',
						content: '是否退出登录',
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								// this.logout();
								uni.redirectTo({
									url: '/pages/login/login'
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
			},
			clearTmp() {
				uni.showLoading({
					title: '清除中',
					mask: true
				});
				/*
				任何临时存储或删除不直接影响程序运行逻辑（清除缓存必定造成业务逻辑的变化，如：打开页面的图片不从缓存中读取而从网络请求）的内容都可以视为缓存。主要有storage、和file写入。
				缓存分为三部分		
					原生层（如：webview、x5播放器的、第三方sdk的、地图组件等）
					前端框架（重启就会自动清除）
					开发者自己的逻辑（如：
						本示例的 检测更新功能下载了apk安装包，
						其他逻辑需要根据开发者自己的业务设计
						比如：有聊天功能的应用，聊天记录是否视为缓存，还是单独提供清除聊天记录的功能由开发者自己设计
					）
				*/
				uni.getSavedFileList({
					success:res=>{
						if (res.fileList.length > 0) {
							uni.removeSavedFile({
								filePath: res.fileList[0].filePath,
								complete:res=>{
									console.log(res);
									uni.hideLoading()
									uni.showToast({
										title: '清除成功',
										icon: 'none'
									});
								}
							});
						}else{
							uni.hideLoading()
							uni.showToast({
								title: '清除成功',
								icon: 'none'
							});
						}
					},
					complete:e=>{
						console.log(e);
					}
				});
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	uni-button:after {
		border: none;
		border-radius: 0;
	}

	/* #endif */
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 750rpx;
		height: 100vh;
		/* #endif */
		flex-direction: column;
		flex: 1;
		background-color: #F9F9F9;
	}

	.bottom-back {
		margin-top: 10px;
		width: 750rpx;
		height: 44px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		border-width: 0;
		border-radius: 0;
		background-color: #FFFFFF;
	}

	.bottom-back-text {
		font-size: 33rpx;
	}

	.mt10 {
		margin-top: 10px;
	}

	.content /deep/ .uni-list {
		background-color: #F9F9F9;
	}

	.content /deep/ .uni-list-item--disabled,.list-item {
		height: 50px;
		margin-bottom: 1px;
	}
</style>