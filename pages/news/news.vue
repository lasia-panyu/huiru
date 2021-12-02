<template>
	<view>
		<fuyin-news ref="child" v-on:navToDetails='navToDetails(arguments)'></fuyin-news>
		<view>
			<pangu-nav ></pangu-nav>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText:""
			}
		},
		async onLoad() {
			// console.log("1111111111111");
			// let result=await this.$util.cloudFunction('data-transfer','getCurrentUserInfo',{});	
			// console.log(result);
   //          let result=await this.$util.cloudFunction('uni-id-cf','getCurrentUserInfo',{});	
			// console.log(result.result.userInfo.user.username);
			// console.log("22222222222222222222");
			// const db = uniCloud.database();
			// const collection = db.collection('opendb-news-categories');
			// let news_categories= await collection.get();
			// console.log(news_categories);
			
			// let category=await this.$util.post('newsTypeSelect');
			// console.log(category)
			// let result1 = await this.$util.cloudFunction("data-transfer",{});
			// console.log(result1);
			
			
			// this.newsList = await this.$util.post('newsModelsSel', {
			//    	'newsTypeId':1
			// });
			// console.log(this.newsList)
			
			
			
		},
		methods:{
			navToDetails(option){
				console.log(option[0]);
				this.$util.news=option[0];
				uni.navigateTo({
					url: `/pages/news/newsdetails`
				})
			},
			search(){
				console.log("search");
				if(this.searchText){
					this.$refs.child.search(this.searchText);
				}else{
					
				}
			},
			onNavigationBarSearchInputChanged(e) {
				  this.searchText=e.text;
				  console.log(e);
			      //text为搜索框中输入的内容
			},
			onNavigationBarSearchInputConfirmed() {				
				this.search();
			},
			onNavigationBarButtonTap(e) {
				this.search();
			},
		}
		
	}
</script>

<style>
</style>
