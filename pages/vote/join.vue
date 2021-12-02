<template>
	<easy-upload
		:dataList="dataList" 
		uploadUrl="http://57.8.11.43:10066"
		deleteUrl='http://57.8.11.43:10066'
		:types="types"
		:uploadCount="9"
		@successImage="successImage"
		@successVideo="successvideo"
	/>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				types: 'image'
			}
		},
		onLoad(option) {
			console.log(option)
			uni.request({
				url: 'http://57.8.11.43:10066/ActivityPaper/activityModelIns',
				method: 'GET',
				data: {
					category: this.types
				},
				success: res => {
					this.dataList = res.data
				},
				fail(err) {
					console.log(err)
				}
			});
		},
		methods: {
			successImage(e){
				uni.showModal({
					content : '上传成功,详细信息请看控制台'
				})
				console.log(e)
			},
			successvideo(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	
</style>
