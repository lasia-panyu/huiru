<template>
	<view class="qizai-cardList__container">
		<view class="qizai-cardList__card" v-for="item,index in voteList" :key="item.post_Id"  @click="clickCard(item)">
			<image class="qizai-cardList__card-img" :src="item.littlePath"  mode="aspectFill"></image>
			<view  class="qizai-cardList__card-desc">
				<text class="qizai-cardList__card-content">{{item.activityId}}号 {{item.title}} {{item.agreeCount}}票</text>
				
				<view class="qizai-cardList__card-header" style="display: flex;flex-direction: row;">
				
				    <view style="text-align: left;width: 50%;"> {{item.brname}}</view>
					<view style="text-align: right;width: 50%;">{{item.teller_Name}}</view>
					<!-- <text class="yticon icon-dianzan-ash qizai-cardList__card-header-img" ></text>	
					 -->
					<!-- <image class="qizai-cardList__card-header-img" :src="item.headerImg" mode="aspectFill"></image>
					 -->
					<!-- <text class="qizai-cardList__card-header-text">{{item.title}}</text> -->
				</view>
			</view>
			<u-button type="primary" @click="clickCard(item)">为他投票</u-button>
		</view>
		<pangu-nav></pangu-nav>
	</view>
</template>
<script>
	export default {
		
		data(){
			return {
				voteList:[],
				gVoteList:[],
				searchText:""
			}
		},
		async onShow(){
			let voteList=await this.$util.post('activityList',{'activityTypeId':1});
			// voteList=this.$util.newsshuffle(voteList);	
			this.voteList=voteList;
			this.gVoteList=voteList;
			// console.log(voteList);
		},
		methods: {
            search(){
				console.log("search");
				if(this.searchText){
					let newsListTmp=[];
					let voteList=this.gVoteList;
					for(let index in voteList){
						if(!voteList[index].title)
						       continue;
						let str=voteList[index].title+voteList[index].teller_Name+voteList[index].brname;
						let str1=voteList[index].activityId;
						if(str.indexOf(this.searchText) != -1||str1==this.searchText) {
							newsListTmp.push(voteList[index]);
						}
					}
					this.voteList=newsListTmp;
					// console.log(this.mixNews)
				}else{
					this.voteList=this.gVoteList;
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
			clickCard(item) {
				this.$util.voteItem=item;
				// let url = item.videoPath ? 'videoDetails' : 'details'; 
				// this.$util.news=item;
				uni.navigateTo({
					url: `/pages/activity/details`
				})
				
			}
		}
	}
</script>
<style>
	.qizai-cardList__container{
		font-size: 22upx;
		width: 100%;
	}
	.qizai-cardList__card{
		width: 47%;
		margin-left: 2%;
		margin-top: 2%;
		text-align: left;
		border-radius: 6upx;
		background-color: white;
		display: inline-block;
	}
	.qizai-cardList__card-img{
		border-radius: 10upx 10upx 0 0;
		width: 100%;
		height: 250upx;
	}
	.qizai-cardList__card-desc{
		padding: 0 14upx;
	}
	.qizai-cardList__card-content{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 15px;
		/* min-height: 80upx; */
	}
	.qizai-cardList__card-header{
		width: 100%;
		position: relative;
		margin: 3upx 0;
	}
	.qizai-cardList__card-header-img{
		width: 50upx;
		height: 50upx;
		border-radius: 40upx;
	}
	.qizai-cardList__card-header-text{
		font-size: 14upx;
		position: absolute;
		margin-top: 8upx;
		margin-left: 10upx;
		color: gray;
		
		display: inline-block;
		white-space: nowrap;
		width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
