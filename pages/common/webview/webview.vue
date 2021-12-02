<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad({url,title}) {
			console.log(url,title);
			this.url = url;
		    // 监听 drawer 消息
		    uni.$on('drawer-page', (data) => {
				console.log(data)
		    	this.url = data;
		    })
		},
		onShow(){
			// console.log(uni.na)
			// uni.setNavigationBarTitle({"1111111"});
		},
		onUnload() {
			uni.$off('drawer-page')
		},
		data() {
			return {
				url:null
			};
		},
		methods:{
			onNavigationBarButtonTap(e) {
				uni.getSubNVueById('drawer').show('slide-in-left', 400);
			},
		}
	}
</script>

<style lang="scss">

</style>
