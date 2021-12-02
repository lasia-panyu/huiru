<template>
	<view>
        <pangu-advert></pangu-advert>
        <pangu-menu></pangu-menu>
		<pangu-nav ></pangu-nav>

    </view>


</template>

<script>
	export default {
		data(){
			return{
				current:0,
				list:'',
			}
		},
		onLoad() {
			this.list=[{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						count: 2,
						isDot: true,
						customIcon: false,
						url:'pages/index/content',
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 2,
						isDot: false,
						customIcon: false,
						url:'pages/account/account',
					},
				];
		},
		methods: {
		}
	}
</script>

<style>
</style>
