<template>
	<view class="countdown" style="display: flex; flex-direction: row;">
		<view class="day" v-if="d!=0"><text class="text">{{d}}</text>天</view> 
		<view class="time" style="margin-left: 9rpx;">{{h<10?'0'+h:h}}</view>
		<text class="text">:</text>
		<view class="time">{{m<10?'0'+m:m}}</view>
		<text class="text">:</text>
		<view class="time">{{s<10?'0'+s:s}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			startTime: {
				type: String,
			},
			endTime:{
				type: String,
			},
		},
		data(){
			return{
				timer:null,
				d:0,
				h:0,
				m:0,
				s:0
			}
		},
		mounted() {
			this.time()
		},
		beforeDestroy(){
			clearInterval(this.timer);
			this.timer = null;
		},
		computed:{
			sTime(){return this.startTime},
			eTime(){return this.endTime}
		},
		watch:{
			endTime(){
				clearInterval(this.timer);
				this.time()
			}
		},
		onShow(){
			this.time();
		},
		methods:{ 
			time(){
				let leftTime = this.GetDateDiff(this.sTime,this.eTime);
				console.log("leftTime:"+leftTime);
					
				if(leftTime==0){
					console.log("confirm");
					this.$emit("confirm");	
				}
				this.getCountdownTime(leftTime);
			},
			//计算两个时间差
			GetDateDiff(startTime, endTime) {
			    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
			    startTime = startTime.replace(/\-/g, "/");
			    endTime = endTime.replace(/\-/g, "/");
			    //将计算间隔类性字符转换为小写
			    var sTime = new Date(startTime); 
			    var eTime = new Date(endTime); 
			    return parseInt((eTime.getTime() - sTime.getTime()) / 1000);
			},
			//计算活动结束时间
			getCountdownTime(leftTime){
				let time = leftTime
				if (time>0) {
					this.timer = setInterval(() => {
						if(time == 0){
							clearInterval(this.timer)
							this.h = 0
							this.m = 0
							this.s = 0
							console.log("confirm");
							this.$emit("confirm");	
						
						}else{
							this.d = parseInt(leftTime/3600/24);
							this.h = parseInt((time/3600)%24);
							this.m = parseInt((time/60)%60);
							this.s = parseInt(time%60);
							time --
						}
					},1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.countdown{display: flex;flex-direction: row;align-items: center;font-size: 40rpx;color: #fff;
	.day{font-size: 22rpx;color: #606060;display: flex;align-items: center;
		.text{border-radius: 15rpx;	line-height: 40rpx;color: #FD3C22;font-size: 40rpx;background-color: #ADC0F1;font-size: 30rpx;
	font-weight: 500}
	}
	.time{border-radius: 15rpx;	line-height: 40rpx;background-color: #ADC0F1;border-radius: 4rpx;box-sizing: border-box;	font-size: 30rpx;
	font-weight: 500;color: #FD3C22;}
	.text{font-size: 36rpx;font-weight: bolder;margin: 0 6rpx;color: #606060;}
	}
	
	// button{
	// 	width: 80rpx;
	// 	height: 40rpx;
	// 	line-height: 40rpx;
	// 	position: absolute;
	// 	top: 20rpx;
	// 	right: 40rpx;
	// 	padding: 10rpx 20rpx;
	// 	border-radius: 15rpx;
	// 	letter-spacing: 2rpx;
	// 	font-weight: 500;
	// 	color: #FFFFFF;
	// 	background-color: #ADC0F1;
	// }
</style>
