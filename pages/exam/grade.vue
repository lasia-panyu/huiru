<template>
	<view>
		<!-- #ifndef H5 -->

		<!-- #endif -->
		<view class="flexView">
			<view class="qiun-charts" >
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
			<view class="scrollView">
				<view class="head-read">
					<view class="flex">
<!-- 						<image class="read-img" :src="userData.headimgurl" mode="aspectFill" />
						<view class="flex-box">
							<view class="flex-box-text">姓名：</view>
							<view class="flex-box-text">手机号：</view>
						</view>
						<view class="arrow arrow-one" @click="showModal = true"><span>名词解释</span></view> -->
					   
					</view>
				</view>
				<view class="white-box">
					<view class="tx">
						<view class="tx-grid">
							<view class="tx-grid-text">
								<view class="title">上次考试成绩</view>
								<view class="money">
									<text>{{grade.e_mark}}</text>
									<text class="money-b"></text>
								</view>
							</view>
						</view>
						<view class="tx-grid" ><span class="tx-grid-comm-sign">时间:{{grade.s_date}}</span></view>
					</view>
					<view class="palace palace-one">
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{grade.s_time_Length}}</text>
									<text class="palace-grid-text-data-b">分钟</text>
								</view>
								<view class="palace-grid-text-name">考试时长</view>
							</view>
						</view>
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{grade.e_total}}</text>
									<text class="palace-grid-text-data-b"></text>
								</view>
								<view class="palace-grid-text-name">考试总分</view>
							</view>
						</view>
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{grade.e_percent}}</text>
									<text class="palace-grid-text-data-b">%</text>
								</view>
								<view class="palace-grid-text-name">分数占比</view>
							</view>
						</view>
					</view>
				</view>
				<view class="top">
					<!-- <tui-tabs
						:tabs="tabs"
						:height="88"
						:currentTab="currentTab"
						:sliderWidth="150"
						:sliderHeight="60"
						bottom="50%"
						color="#888"
						selectedColor="#fff"
						sliderBgColor="#ff8a4a"
						@change="changeTab"
					></tui-tabs> -->
					
				</view>

			    <view class="list-view">
			    		<view class="list-item" v-for="(item, index) in gredeList" :key="index" hover-class="hover" :hover-stay-time="150" bindtap="detail">
			    			<view class="content-box">
			    				<view class="des-box">
			    					<view class="tit">考试场次:{{item.s_id}}</view>
			    					<view class="time">考试日期:{{ item.s_date }},总分数{{item.e_total}}</view>
			    				</view>
			    			</view>
			    			<view class="money" >{{item.e_mark}}</view>
			    		</view>
			    </view>	
				<view class="tip">已经到最底部了！</view>
			</view>
		</view>
	</view>
</template>

<script>
    import tuiTabs from '@/components/tui-tabs/tui-tabs';
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				grade:{},
				splitNumber:0,
				candidates:[],
				gredeList:[],
				keys:['s_id','s_start_Time','e_mark','s_teacher_id'],
				gradeline: {
					categories:[],
					series: [{
						name: '考试成绩',
						data: [],
						color: '#000000'
					}]
				},
				max:0,
				min:0,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				userInfo:{}
			}
		},
		async onLoad() {
			this.userInfo=await this.$util.getUser(this);
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			async getServerData(){
				let result=await this.$util.post("tellerSceneMark",{teller_id:this.userInfo._id});
				this.gredeList=result;
				this.grade=result[0];
				let bound=result.length>=5?5:result.length;
				let categories=(result.map(x=>x['s_date']).slice(0,bound).reverse());
				this.candidates=categories;
				let score=result.map(x=>parseInt(x['e_mark'].replace('分','').replace('未交卷',0))).slice(0,bound).reverse()
				this.gradeline.categories=categories;
				this.gradeline.series[0].data=score;
				// this.max=Math.max(...score);
				// this.min=Math.min(...score);
				// console.log(Math.max(...score));
			    this.splitNumber=this.unique(score).length-1;
				_self.showLineA("canvasLineA",this.gradeline);

			},
			unique(arr) {
			  return arr.filter(function(item, index, arr) {
			    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
			    return arr.indexOf(item, 0) === index;
			  });
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						enableScroll:true,
						labelCount:5
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:this.splitNumber,
						format:(val)=>{return val.toFixed(0)+'分'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		background-color: #C8C9CC;
	
	}
	.card{
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
page {
	background-color: #fff;
}
.ns {
	width: 100%;
	height: 60px;
	text-align: center;
	line-height: 200rpx;
	color: white;
	font-size: 34rpx;
	font-weight: bold;
	background: linear-gradient(to right, #ff8440, #ff1e0f);
}
.top {
	margin-top: 20rpx;
}
.flexView {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	.scrollView {
		width: 100%;
		height: 100%;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		position: relative;
		padding-bottom: 116rpx;
		.head-read {
			background: linear-gradient(to right, #ff8440, #ff1e0f);
			background-color: #ff8440;
			padding-bottom: 100rpx;
			.flex {
				display: flex;
				align-items: center;
				padding: 50rpx;
				position: relative;
				.read-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 100%;
					overflow: hidden;
					margin-right: 20rpx;
					border: 4rpx solid rgba(255, 255, 255, 0.3);
				}
				.flex-box {
					flex: 1;
					min-width: 0;
					font-size: 26rpx;
					color: #333;
					&-text {
						margin: 10rpx 0;
						color: #f5f5f5;
						font-weight: normal;
					}
				}
				.arrow {
					position: relative;
					padding-right: 30rpx;
					span {
						font-size: 28rpx;
						color: white;
					}
					&:after {
						content: ' ';
						display: inline-block;
						height: 12rpx;
						width: 12rpx;
						border-width: 4rpx 4rpx 0 0;
						border-color: #848484;
						border-style: solid;
						transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
						position: relative;
						top: -4rpx;
						position: absolute;
						top: 50%;
						margin-top: -8rpx;
						right: 4rpx;
						border-radius: 2rpx;
					}
				}
				.arrow-one:after {
					border-color: white;
					margin-top: -6rpx;
				}
			}
		}
		.white-box {
			width: 94%;
			background: white;
			border-radius: 10rpx;
			margin: -120rpx auto 20rpx;
			box-shadow: 0 6rpx 20rpx #e7e7e7;
			.tx {
				padding-top: 26rpx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-content: center;
				&-grid {
					box-sizing: border-box;
					&:first-child {
						margin-left: 40rpx;
					}
					&-comm-sign {
						display: block;
						border-radius: 40rpx 0 0 40rpx;
						font-size: 26rpx;
						padding: 16rpx 44rpx;
						background: linear-gradient(to right, #fef082, #ffc551);
						background-color: #fef082;
						color: #cf4400;
					}
					&-text {
						display: block;
						color: #333;
						font-size: 26rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						.title {
							font-size: 26rpx;
							font-weight: normal;
							color: #ff6423;
						}
						.money {
							font-size: 60rpx;
							color: #ff6423;
							letter-spacing: 2rpx;
							margin-bottom: 10rpx;
							&-b {
								font-size: 28rpx;
							}
						}
					}
				}
			}
			.palace {
				padding-bottom: 20rpx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				&-grid {
					flex: 1;
					position: relative;
					box-sizing: border-box;
					&:not(:last-child) {
						&:after {
							width: 1rpx;
							height: 80rpx;
							background: #fddece;
							content: ' ';
							display: inline-block;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					&-text {
						display: block;
						text-align: center;
						color: #333;
						font-size: 32rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&-name {
							font-size: 26rpx;
							font-weight: normal;
							color: #ff8a4a;
						}
						&-data {
							font-size: 32rpx;
							color: #ff8a4a;
							letter-spacing: 2rpx;
							margin-bottom: 5rpx;
							&-b {
								font-size: 20rpx;
							}
						}
					}
				}
			}
		}
	}
}
.list-view {
	position: relative;
	width: 100%;
	overflow: hidden;
}

.list-item {
	width: 100%;
	padding: 30rpx 28rpx;
	box-sizing: border-box;
	background: #fff;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	border-bottom: 1rpx solid #eaeef1;
}

.item-last::after {
	left: 0 !important;
}

.content-box {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.des-box {
	min-height: 80rpx;
	padding-left: 28rpx;
	box-sizing: border-box;
	vertical-align: top;
	color: #333;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.tit {
	font-size: 32rpx;
	max-width: 420rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.source {
	margin: 12rpx 0;
}
.time {
	color: #888;
}

.money {
	font-size: 38rpx;
	font-weight: 500;
	color: #ff1e0f;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-left: 20rpx;
}

.less {
	color: #4caf50 !important;
}
.tip {
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	font-size: 24rpx;
	color: #888;
}
</style>
