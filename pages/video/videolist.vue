<template>
	<view class="qizai-cardList__container">
		<view class="qizai-cardList__card" v-for="item,index in videoList" :key="item.post_Id"  @click="clickCard(index)">
			<image class="qizai-cardList__card-img" :src="item.cover"  mode="aspectFill"></image>
			<view  class="qizai-cardList__card-desc">
				<text class="qizai-cardList__card-content">{{item.title}}</text>
				<view class="qizai-cardList__card-header" style="display: flex;flex-direction: row;">
				    <view style="text-align: left;width: 50%;">观看次数:{{item.views_Count}}</view>
					<view style="text-align: right;width: 50%;">发布时间:{{item.published_At}}</view>
					<!-- <text class="yticon icon-dianzan-ash qizai-cardList__card-header-img" ></text>	
					 -->
					<!-- <image class="qizai-cardList__card-header-img" :src="item.headerImg" mode="aspectFill"></image>
					 -->
					<!-- <text class="qizai-cardList__card-header-text">{{item.title}}</text> -->
				</view>
			</view>
		</view>
		<pangu-nav></pangu-nav>
	</view>
</template>
<script>
	export default {
		
		data(){
			return {
				videoList:[],
				userInfo:{}
			}
		},
		async onShow(){
			// console.log(this.$util);
			this.userInfo=await this.$util.getUser(this);
			let videoList=await this.$util.post('newsVideoSel',{'formType':'V',teller_Id:this.userInfo._id});
			console.log(this.videoList);
			let i=0;
			videoList=videoList[0].map(x=>{
				if(!x.cover){
					x.cover="https://fuyin.fuxinbank.com:10054/gms/UpLoad/NewsImg/20210411/1618135803567012466.jpg";		
				   
				}
				x.newsCorrelations=videoList[1][i];
				x.comments=videoList[2][i];
				console.log(x.newsCorrelations.dqwzdz)
				x.like=x.newsCorrelations.dqwzdz=="0"?false:true;
				i++;
				// console.log(x.like)
				return x;
			});
			this.videoList=videoList;
			this.$util.videoList=videoList;
			console.log(videoList)
			// newList.map(x=>{
			// 	x.imgPath=["https://pany.seaway.net.cn/img/logo.png"];
			// 	x.type=1;
			// })
			// this.newList=newList;
		},
		methods: {
			clickCard(index) {
				console.log(index);		        
				uni.setStorageSync('index', index);
				uni.setStorageSync('shortVideoList', this.$util.videoList);
				this.$u.route('/pages/video/shortvideo');
				
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
