<template>
	<view><!-- :mid-button-size='240' :mid-button="true" -->
		<u-tabbar :list="list"   
		:beforeSwitch='beforeSwitch'></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,									list: [
					{
						iconPath: "file-text",
						selectedIconPath: "file-text-fill",
						text: '福讯',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath:'/pages/news/news',
					},
					{
						iconPath: "play-right",
						selectedIconPath: "play-right-fill",
						text: '福音',
						isDot: false,
						customIcon: false,
						pagePath:'/pages/video/videolist',
					},
					// {
					// 	iconPath: "../../static/icon/nav.png",
					// 	selectedIconPath: "../../static/icon/nav.png",
					// 	midButton: true,
					// 	customIcon: false,
					// 	size:300,
					// 	pagePath:'/pages/news/news',

					// },
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '学习',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath:'/pages/index/index',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 0,
						isDot: false,
						customIcon: false,
						pagePath:'/pages/account/account',
					},
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
			}
		},
		methods: {
			beforeSwitch(index) {
				console.log(index);
				// this.$u.route({type:'switchTab',url:list[index].pagePath});
				return true;
			},
		}
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
</style>
