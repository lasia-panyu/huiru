<template>
	<view class="content">
		<view class="listview" v-for="(item,index) in activity">
			<u-button type="primary"  v-on:click="to_tv(index)">
				<text>{{item.title}}</text>
			</u-button>
		</view>
		
		<!-- <view class="other">
			<button v-on:click="play_other">自助播放</button>
		</view> -->
		
		
	</view>
</template>

<script>
	
	
	export default {
		data() {
			
			
			return {
				activity:[]
			}
		},
		onLoad() {
			
			var that = this;
			uni.request({
					method:'POST',
					
				    url: 'http://57.8.11.43:10066/ActivityPaper/activityList', //数据接口。
					
					dataType:'json',
				    data: {},
				    header: {
						'content-type':'application/json'
				        
				    },
				    success:function (res) {
					
					console.log(res.data)
					that.activity = res.data
					console.log(that.activity)
					getApp().globalData.activity = that.activity
				    },
					fail: (e) => {
						console.log(e)
					}
				
				});
			
			
			
			
			},
		components: {
			
		},
		methods: {
			to_tv(index){
				uni.navigateTo({
					url: '/pages/vote/index?id=' + index
				});
			},
			play_other(){
				this.prompt()
			},
			
			//自定义弹出输入框方法
			prompt: function() { //显示弹出框
					uni.pageScrollTo({ //返回顶部
						scrollTop: 0,
						duration: 0 //动画时长
					})
					this.$refs.prompt.show();
			},
			onConfirm: function(e) { //确定
				let _cost = e;
				if (_cost == '') { //空
					console.log('你还未输入');
					return;
				} else { //输入了
					this.$refs.prompt.hide();
					uni.navigateTo({
						url: '/pages/livebroadcast/TV/TV?id=' + _cost
					});
				}
			},
			onCancel: function() { //点击取消密码
				this.$refs.prompt.hide();
				this.$refs.prompt.cost = '';
			},
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
