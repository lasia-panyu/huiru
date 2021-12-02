<template>
	<view class="content">
		<view class="listview" v-for="(item,index) in tv_rtmp">
			<u-button type="primary"  v-on:click="to_tv(index)">
				<text>{{index+1}}--{{item.live_Name}}</text>
			</u-button>
			
			
		</view>
		<u-popup v-model="show" mode="center" width="60%">
		  <u-input v-model="value" :password-icon="true" type="password" height=100 :placeholder="ts" input-align=center ></u-input>
		  <u-button  class="trueBtn" type="primary" v-on:click="goIn(index)" input-align=center>进入房间</u-button>
		</u-popup>
		<!-- <view class="other">
			<button v-on:click="play_other">自助播放</button>
		</view> -->
		
		
	</view>
</template>

<script>
	
	
	export default {
		data() {
			
			
			return {
				tv_rtmp:[],
				show:false,
				value:'',
				ww:'',
				ts:'请输入房间密码'
			}
		},
		onLoad() {
			
			var that = this;
			uni.request({
					method:'POST',
					
				    url: 'https://fuyin.fuxinbank.com:10058/PanguService/liveMessage_Sel', //数据接口。
					
					dataType:'json',
				    data: {},
				    header: {
						'content-type':'application/json'
				        
				    },
				    success:function (res) {
					
					/* let str = JSON.stringify(res.data);
					console.log(str) */
					
					that.tv_rtmp = res.data
					console.log(that.tv_rtmp[0])
					getApp().globalData.final_tv_rtmp = that.tv_rtmp
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
				let pwd = getApp().globalData.final_tv_rtmp
				
				let str = JSON.stringify(pwd[index].push_Pwd);
				console.log(str)
				//没有密码直接进入
				if(pwd[index].push_Pwd == null){
					uni.navigateTo({
						url: '/pages/livebroadcast/TV/TV?id=' + index
					});
				} else {
				this.show = true;
				this.ts = "请输入密码";
				this.ww = index;
				}
			},
			goIn(){
				console.log(this.ww);
			    let pwd = getApp().globalData.final_tv_rtmp
				
				let str = JSON.stringify(pwd[this.ww].push_Pwd);
				console.log(str)
				//判断密码
				 if(this.value == pwd[this.ww].push_Pwd)
				{
					this.show = false;
					console.log(this.ww)
					uni.navigateTo({
					url: '/pages/livebroadcast/TV/TV?id=' + this.ww
				});
				} else {
					this.ts = "密码错误，请重新输入";
					this.value = "";
					return;
				}
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

.trueBtn {
		background: #1E90FF;
		color: white;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		border-radius: 5rpx;
		width: 100%;
		font-size: 35rpx;
	}
</style>
