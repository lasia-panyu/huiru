<template>
	<view>
	<pangu-advert ></pangu-advert>
	<!-- 
	<u-toast ref="uToast" />  :title="title"
	 -->
	<pangu-card :lists="opinions" :keys="keys"  clickflag=true v-on:handleSubmit='handleSubmit'>	
	</pangu-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				opinions:[],
				keys:['newsName','','newsTitle','newsDesc'],
			};
		},
		async onLoad(){
			let result=await this.$util.upost('newsList',{});
			this.opinions=result;
			
			console.log(result);
		},
		methods: {
			handleSubmit(item){
			    let url = encodeURIComponent(item.newsHref)
				console.log(url)
				this.$u.route('/pages/opinion/webview?url='+url)
		    },
		}
}
</script>

<style>
</style>
