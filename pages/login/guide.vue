<template>
	<view id="guide">
		<video id="video" src="/static/video/start.mp4" :direction="0" :autoplay="true" :controls="false"
			:show-play-btn="false" :show-center-play-btn="false" :enable-progress-gesture="false"
			:style="{ height: windowHeight,width:windowWidth}" objectFit="fill" direction='-90'
			enable-play-gesture="false" @ended="goIndex"></video>
		<!-- contain：fill -->
		<!-- <cover-view @click="goIndex">立即体验</cover-view> -->
	</view>
</template>

<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	const PACKAGE_INFO_KEY = '__package_info__'

	export default {
		data() {
			return {

				windowHeight: '0px',
				windowWidth: '0px',
				isLoginPage: true,
			};
		},
		onLoad() {
			console.log("onLoad");
		},
		onLaunch() {
			console.log("onLaunch");
		},
		onReady: function(res) {

			this.videoContext = uni.createVideoContext('video');
			/* plus.screen.lockOrientation('portrait-primary'); */
			// {direction: 1}
			/* this.videoContext.requestFullScreen(); */
			console.log("33333333333333333333333")
			this.windowHeight = uni.getSystemInfoSync().windowHeight + 'px';
			this.windowWidth = uni.getSystemInfoSync().windowWidth + 'px';

		},
		methods: {
			playvideo: function(e) {
				//     this.videoContext = uni.createVideoContext('video', this);
				//     this.videoContext.requestFullScreen({direction: 0});
				//     this.videoContext.play()
				console.log("222222222222222222222222222222222222222222222")

			},
			timeupdate(event) {

				uni.getSystemInfo({

					success: (data) => {
						console.log(data)
						if (data.platform == 'ios') {
							if (event.detail) {
								event.detail.diff = event.detail.duration - event.detail.currentTime;
								if (event.detail.diff < 0.4) {
									this.goIndex()
								}
							}
						}
					}
				})
			},

			async goIndex() {
				callCheckVersion().then(async res => {

					console.log('检查是否有可以更新的版本', res);
					if (res.result.code > 0) {
						// update=true;
						// 有新版本
						// getApp({
						// 	allowDefault: true
						// }).appVersion.hasNew = true;
						// 检查更新
						console.log(1111111)
						checkUpdate();
					} else {
						console.log("11111111111111111111111111111-111111111111111111");
						let result = await this.$util.getUser(this);
						console.log(result);
						if (result.code == 0) {
							this.$u.route({
								url: 'pages/news/news',
								type: 'switchTab',
							})
						} else {
							this.$u.route({
								url: '/pages/login/login',
								type: 'redirectTo',
							});
						}
					}
					console.log(11111111111);
				})

			}
		},
	}
</script>
