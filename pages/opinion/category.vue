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
				keys:['categroyKeyword','','categroyType','categroyName'],
			};
		},
		async onShow(item){
			console.log(item)
			let result=await this.$util.upost('keysList',{});
			this.opinions=result;
			console.log(result);
		},
		onLoad(item){
		
		},
		
		methods: {
			handleSubmit(item){
				console.log(item)
				this.$u.route('/pages/opinion/keyform',item)
		    },
		}
}
</script>

<style>
</style>
