<template>
	
	<view class="content">
			<view class="listview" v-for="(item,index) in activity">				
				<u-button type="primary" v-on:click="tp(item)">
					<text>{{vote}}</text>
				</u-button>				
			</view>	
			
			<view class="listview" v-for="(item,index) in activity">
				<u-button type="primary" v-on:click="cj(item)">
					<text>{{join}}</text>
				</u-button>				
			</view>	
	</view>
	
</template>

<script>
	
	export default{
		data() {
			return {
				vote:[],
				join:[],
				activity:[]
				
			}
		},
		onLoad(option) {
			
			this.vote = "去给选手投票";
			this.join = "我要参加比赛";
			this.activity =  option.id;
			console.log(this.activity)
		},
		methods:{
			
			tp(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/vote/vote?id=' + item
					})
					console.log("aaaaaaaaaa")
			},
			cj(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/vote/join?id=' + item
				})
				console.log("bbbbbbbbb")
			}
			
		}
	}
	
</script>

<style>
	
	.listview{
		margin-top: 30rpx;
	}
	.other{
		margin-top: 60rpx;
	}
</style>
