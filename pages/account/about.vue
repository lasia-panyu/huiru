<template>
	<view class="page">
		<view class="header">
			<image :src="appLogo" mode=""></image>
			<view>
				<view>
					{{appName}}
				</view>
				<view>
					{{appDes}}
				</view>
			</view>
		</view>
		<view class="bg">

		</view>
		<view class="content" style="display: block;border: 1px;">
			<image src="../../static/content.png"   mode=""></image>
		</view>
		<view class="btns">
			<view @click="down('and')">
				<view class="icon">
					<image src="../../static/and.png" mode=""></image>
				</view>
				<view class="text">
					<view>Andriod版</view>
					<view>免费下载</view>
				</view>
			</view>
			<view @click="down('ios')">
				<view class="icon">
					<image src="../../static/ios.png" mode=""></image>
				</view>
				<view class="text">
					<view>ios版</view>
					<view>免费下载</view>
				</view>
			</view>
		</view>
		<view class="wx" v-if="weixin">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appLogo: 'https://fuyin.fuxinbank.com:10054/newsPaper/221.png', //app logo图片路径
				appName: '福音', //app名称
				appDes: 'uni-app框架演示示例', //app简述
				andHref: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/aea01640-ec4f-11ea-b997-9918a5dda011.apk', //安卓app下载地址
				iosHref: 'https://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8', //苹果appStore链接
				weixin: false, //是否为微信内浏览器打开
				scheme: '' //scheme地址 如果已安装app直接打开，置空则不执行
			}
		},
		onLoad() {
			// 动态设置页面标题
			this.setTitle()
			// 判断该页面是否为微信内置浏览器内打开 true>显示浏览器内打开引导
			this.isWX()
			// 如果需要通过scheme直接打开app
			this.openApp()
			
		},
		methods: {
			setTitle() {
				uni.setNavigationBarTitle({
					title: this.appName + '下载'
				});
			},
			isWX() {
				let ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					this.weixin = true
				} else {
					this.weixin = false
				}
			},
			openApp() {
				if(this.scheme){
					window.location = this.scheme
				}
			},
			down(type) {
				if (type == 'and') {
					window.location.href = this.andHref;
				} else {
					window.open(this.iosHref);
				}
			}
		}
	}
</script>

<style lang="less">
	@BgColor: #0079ff; //主题背景色

	.page {
		background-color: #f8f8f8;
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.header {
			width: 100vw;
			height: 350upx;
			background-color: @BgColor;
			padding-top: 110upx;
			display: flex;
			justify-content: center;

			image {
				width: 120upx;
				height: 120upx;
				margin-right: 30upx;
			}

			>view {
				height: 120upx;
				color: #fff;
				font-weight: 700;
				display: flex;
				flex-direction: column;
				justify-content: center;

				view:nth-child(1) {
					font-size: 34upx;
				}

				view:nth-child(2) {
					font-size: 28upx;
				}
			}
		}

		.bg {
			width: 100vw;
			height: 210upx;
			background-image: url(../../static/bg.png);
			background-size: 100%;
			background-position: center bottom;
			background-repeat: no-repeat;
			position: absolute;
			left: 0;
			top: 300upx;
		}

		.content {
			width: 750upx;
			height: 750upx;
			position: absolute;
			top: 50%;
			left: 0upx;
			transform: translateY(-54%);
			overflow: hidden;
            border-radius:50%;
			image {
				width: 750upx;
				height: 750upx;
			}
		}

		.btns {
			width: 100vw;
			height: 300upx;
			position: absolute;
			bottom: 3%;
			left: 0;

			>view {
				width: 380upx;
				height: 120upx;
				background-color: @BgColor;
				color: #FFFFFF;
				display: flex;
				margin: 0 auto;
				margin-bottom: 40upx;
				border-radius: 15upx;
				box-shadow: 0 10upx 24upx -10upx @BgColor;
				;

				.icon {
					width: 120upx;
					height: 120upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: center;

					view:nth-child(1) {
						font-size: 34upx;
					}

					view:nth-child(2) {
						font-size: 28upx;
					}
				}

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			>view:nth-child(2) {
				margin-bottom: 0upx;
			}
		}

		.wx {
			position: fixed;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .7);
			width: 100vw;
			height: 100vh;
			background-image: url(../../static/wx.png);
			background-size: 100%;
			background-position: center 100upx;
			background-repeat: no-repeat;
		}
	}
</style>
