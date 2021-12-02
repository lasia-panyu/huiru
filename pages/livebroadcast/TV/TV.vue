<template>
	<view>
		<video autoplay="true"  :src="src" @error="error" @fullscreenchange="fullscreenchange"></video>
		<view class="list">
			<view class="listview" v-for="(item,index) in tv_rtmp">
				<!-- <button v-on:click="check_tv(index)">
					<text>{{item.live_Name}}</text>
				</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "", //播放地址
				tv_rtmp: [],
				index: "" //下标
			}
		},
		onLoad(option) {
			this.tv_rtmp = getApp().globalData.final_tv_rtmp
			/* this.tv_rtmp = JSON.stringify(this.tv_rtmp); */
			console.log(this.tv_rtmp)
			uni.getNetworkType({ //获取网络状态
				success: function(res) {
					if (res.networkType == "none") { //没有网络或者网络不好
						uni.showToast({
							title: "网络走丢了呢",
							duration: 1000,
							icon: "none"
						});
					}
				}
			});
			uni.onNetworkStatusChange(function(res) { //网络发生变更时
				if (res.isConnected) {
					uni.showToast({
						title: "网络回来啦",
						duration: 1000,
						icon: "none"
					});
				} else
					uni.showToast({
						title: "网络走丢了呢",
						duration: 1000,
						icon: "none"
					});
			});
			
			if (option.id < 1000) {
				this.index = option.id
				this.src = this.tv_rtmp[this.index].live_PullPath
				uni.setNavigationBarTitle({ //修改标题//防止页面崩溃后标题异常//不一定有效
					title: this.tv_rtmp[this.index].live_Name
				})
			}else{
				this.index = 0
				this.src = option.id
				uni.setNavigationBarTitle({ //修改标题//防止页面崩溃后标题异常//不一定有效
					title: option.id
				})
			}
		},
		methods: {
			error: function() {

			},
			fullscreenchange: function(event) {
				//智能切换屏幕方向//会导致第二次进入页面显示异常，宽高获取异常导致rpx出错
				if (event.detail.fullScreen) { //全屏
					plus.screen.lockOrientation("landscape") //自动感应切换屏幕横屏的方向
				} else { //全屏切换为小屏
					plus.screen.lockOrientation("portrait-primary") //设置屏幕竖直
				}
			},
			check_tv: function(index) {
				this.src = this.tv_rtmp[index].live_PullPath
				this.index = index
				uni.setNavigationBarTitle({ //修改标题//防止页面崩溃后标题异常//不一定有效
					title: this.tv_rtmp[this.index].live_Name
				})
			},
		}
	}
</script>

<style>
	video {
		width: 750rpx;
		position: fixed;
		top: 0;
		left: 0;
	}

	.list {
		margin-top: 470rpx;
	}

	.listview {
		margin-top: 30rpx;
	}
</style>
