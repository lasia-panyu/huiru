<template>
	<view class="center">
		<view class="userInfo" @click.capture="toUserInfo">
			<view v-if="userInfo.avatar_file" style="display: flex;flex-direction: row;">
				<view style="justify-content: center;margin: auto;">
					<uni-file-picker v-model="userInfo.avatar_file" fileMediatype="image" :del-icon="false"
						return-type="object" :image-styles="listStyles" disablePreview disabled />
				</view>
			</view>
			<view v-else style="display: flex;flex-direction: row;">
				<view style="justify-content: center;margin: auto;">
					<image class="logo-img" src="/static/uni-center/defaultAvatarUrl.png"></image>
				</view>

			</view>
			<view class="logo-title" style="text-align: center;">
				<text class="uer-name">{{userInfo.nickname||userInfo.username||userInfo.mobile||'未登录'}}</text>
			</view>
		</view>
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index)" :key="index">
				<uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
				<text class="text">{{item.text}}</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
				:extraIcon="{type:item.icon,color:'#999'}">
				<view v-if="item.showBadge" class="item-footer" slot="footer">
					<text class="item-footer-text">{{item.rightText}}</text>
					<view class="item-footer-badge"></view>
				</view>
			</uni-list-item>
		</uni-list>
		<pangu-nav></pangu-nav>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	import uniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';

	const db = uniCloud.database();
	export default {
		data() {
			return {
				userInfo: {},
				gridList: [{
						"text": "投票大赛",
						"icon": "chat",
						"pages": "/pages/activity/vote"
					},
					{
						"text": "福音云",
						"icon": "cloud-upload"
					},
					{
						"text": "我的成绩",
						"icon": "contact",
						"pages": "/pages/exam/grade"
					},
					{
						"text": "下载地址",
						"icon": "download",
						"pages": "/pages/ucenter/about/about"
					}
				],
				ucenterList: [
					[
						// #ifdef APP-PLUS
						{
							"title": '去评分',
							"event": 'gotoMarket',
							"icon": "hand-thumbsup"
						},
						//#endif
						{
							"title": '阅读过的文章',
							"to": '/pages/ucenter/read-news-log/read-news-log',
							"icon": "flag"
						},
						{
							"title": '我的积分',
							"to": '',
							"event": 'getScore',
							"icon": "paperplane"
						}
						// // #ifdef APP-PLUS
						// , {
						// 	"title": '分销推荐',
						// 	"event": 'share',
						// 	"icon": "redo"
						// }
						// // #endif
					],
					[{
						"title": '问题与反馈',
						"to": '/uni_modules/uni-feedback/pages/uni-feedback/uni-feedback',
						"icon": "help"
					}, 
					{
						"title": '修改密码',
						"to": '/pages/ucenter/login-page/pwd-retrieve/pwd-retrieve',
						"icon": "contact"
					},
					{
						"title": '设置',
						"to": '/pages/ucenter/settings/settings',
						"icon": "hand-thumbsup"
					}],
					[{
						"title": '关于',
						"to": '/pages/ucenter/about/about',
						"icon": "info"
					}]
				],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				}
			}
		},
		async onShow() {
			this.userInfo = await this.$store.dispatch("user/getUser");
			console.log(this.userInfo);
		},
		computed: {
			...mapGetters({
				login: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				}
			},
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfoimage'
				})
			},
			tapGrid(index) {
				// uni.showToast({
				// 	title: '你点击了，第' + (index + 1) + '个',
				// 	icon: 'none'
				// });
				if (index == 1) {
                   // 
				   uni.navigateTo({
				   	url: "/pages/common/webview/webview?title=福音管理后台&url=http://static-3b197c47-f4d8-455c-b037-4e5e50a58297.bspapp.com/#/pages/login/login"
				   })
				} else {
					uni.navigateTo({
						url: this.gridList[index].pages
					})
				}
			},
			/**
			 * 去应用市场评分
			 */
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					// 这里填写appstore应用id
					let appstoreid = this.appConfig.marketId.ios; // 'id1417078253';
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8');
				}
				if (uni.getSystemInfoSync().platform == "android") {
					var Uri = plus.android.importClass("android.net.Uri");
					var uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android);
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent(Intent.ACTION_VIEW, uri);
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				}
				// #endif
			},
			/**
			 * 获取积分信息
			 */
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: '请登录后查看积分',
					icon: 'none'
				});
				uni.showLoading({
					mask: true
				})
				db.collection("uni-id-scores").where('user_id == $env.uid').field('score,balance').get().then((res) => {
					console.log(res);
					const data = res.result.data[0];
					let msg = '';
					msg = data ? ('当前积分为' + data.balance) : '当前无积分';
					uni.showToast({
						title: msg,
						icon: 'none'
					});
				}).finally(() => {
					uni.hideLoading()
				})
			},
			async share() {
				let {
					result
				} = await uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'getUserInviteCode'
					}
				})
				console.log(result);
				let myInviteCode = result.myInviteCode || result.userInfo.my_invite_code
				console.log(myInviteCode);
				let {
					appName,
					logo,
					company,
					slogan
				} = this.appConfig.about
				// #ifdef APP-PLUS
				uniShare({
					content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: this.appConfig.h5.url +
							`/#/pages/ucenter/invite/invite?code=${myInviteCode}`,
						title: appName,
						summary: slogan,
						imageUrl: logo +
							'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
							"img": "/static/app-plus/sharemenu/wechatfriend.png",
							"text": "微信好友",
							"share": {
								"provider": "weixin",
								"scene": "WXSceneSession"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/wechatmoments.png",
							"text": "微信朋友圈",
							"share": {
								"provider": "weixin",
								"scene": "WXSenceTimeline"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/weibo.png",
							"text": "微博",
							"share": {
								"provider": "sinaweibo"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/qq.png",
							"text": "QQ",
							"share": {
								"provider": "qq"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/copyurl.png",
							"text": "复制",
							"share": "copyurl"
						},
						{
							"img": "/static/app-plus/sharemenu/more.png",
							"text": "更多",
							"share": "shareSystem"
						}
					],
					cancelText: "取消分享",
				}, e => { //callback
					console.log(e);
				})
				// #endif
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	page {
		background-color: #f8f8f8;
	}

	/* #endif*/

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.userInfo {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 50px;
		background-image: url(../../static/uni-center/headers.png);
		flex-direction: column;
		align-items: center;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.uer-name {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750rpx;
		background-color: #007AFF;
		height: 40rpx;
	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 30rpx;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item /deep/ .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}


	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list /deep/ .uni-list--border:after {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
		margin-left: 80rpx;
	}

	.center-list /deep/ .uni-list--border-top,
	.center-list /deep/ .uni-list--border-bottom {
		display: none;
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}
</style>
