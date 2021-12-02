<template>
	<view class="content">
	
		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<view style="display: flex;flex-direction: row;font-size: 30px;" >
						<text class="title" style="width: 100%;text-align: center;font-size: 30px;">{{vote.title}}</text>
						<view style="align-items: right;margin: auto;">
							<u-icon name="thumb-up-fill" color="red" size="50rpx" style="margin: auto;"></u-icon>					
						</view>
						{{vote.agreeCount}}									
					</view>
					
					<view class="introduce" style="display: flex;flex-direction: column;">
						<view style="text-align: right;">
							<text>姓名:{{vote.teller_Name}}</text>
							<text>机构:{{vote.brname}}</text>
						<!-- 	<text>{{newsCorrelations.ydCount}}阅读</text> -->
						</view>
					    <view style="text-align: right;">
							
							<!-- <text>发布日期:{{news.published_At}}</text> -->
						</view>
						<!-- <text class="time">机构:{{item.published_At}}</text> -->
									
					</view>
					
							
					 
			<!-- 		<rich-text  :nodes="news.content"  @click="viewImage()"></rich-text> -->
					<image :src="vote.littlePath" :style="{ height:`${sysH}`}"  class="imgVote" mode="aspectFit"   @click="viewImage()" ></image>
					
					<u-button type="primary" @click="ztap()" style="width: 150px;margin-top: 30px;border-radius: 50%;height: 150px;font-size: 30px;">投票</u-button>
					
					<image src="../../static/image/banner.png" style="width: 100%;" mode="aspectFit"></image>
					
	
				
					
			<!-- 		<pangu-collects 
					:newsCorrelations='newsCorrelations'
				    :zaction='zaction'
					:caction='caction'
					v-on:ctap='ctap'
					v-on:ztap='ztap'>					
					</pangu-collects> -->
				<!-- 	
					<pangu-comment
					:newsCorrelations="newsCorrelations"
					:comments="comments"
					v-on:comment='comment(arguments)'
					></pangu-comment> -->
					
				</view>
				
				
	
			</view>
		</scroll-view>
		
<!-- 		<view class="bottom" style="height: 35px;">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input 
					class="input"
					type="text" 
					placeholder="点评一下把.." 
					placeholder-style="color:#adb1b9;"
					v-model="commentOwn"/>
			</view>
			<text class="confirm-btn" @tap="comment">提交</text>
		</view>	 -->
	
		<u-toast ref="uToast" />
	   

	   	<!-- 普通弹窗 -->
	   	<u-popup v-model="show" mode="center" width="100%" height="600px" >
	   		<movable-area class="area"  out-of-bounds   >
				<movable-view  :x="x" :y="y" class="mview" scale="true" direction="all" scale-max=20 >
					<image class="mview" :src="tempFilePath" mode="aspectFit" ></image>
				</movable-view>
			</movable-area>
	   	</u-popup>

	   
	</view>
</template>

<script>

	export default {

		data() {
			return {
				commentOwn:'',
				comments:[],
				news:this.$util.news,
				zaction:false,
				caction:false,
				newsCorrelations:{},
				vote:this.$util.voteItem,
				show:false,
				width:'0px',
				height:'0px',
		        x:"0px",
				y:"0px",
				tempFilePath:"",
				marl:"-1600px",
				sysH:"",
				style:{
					"width":"3200px",
					// "height":"1800px",
					// "margin-left":"-1600px"
				},
				userInfo:{}
			}
		},
		async onLoad(){	
			console.log("1111111111111");
			this.userInfo=await this.$util.getUser(this);
			// this.vote={};
			// this.vote.littlePath="https://fuyin.fuxinbank.com:10054/newsPaper/vote.jpg";			
			// this.tempFilePath=this.vote.littlePath;
			// this.width=uni.getSystemInfoSync().windowWidth;
			// this.style.width=this.width;
			let result = await this.setConf();

			console.log(result);
		},
		async onShow(){

		},
 		methods: {	
			async setConf(){
				return new Promise((resolve, reject) => {
					uni.showLoading({
						title:"加载中"
					});
				    uni.downloadFile({
				        url:  this.vote.imgPath,
				        methods: 'GET',
				    	success: (res) => {
				    		console.log(res);
				    		console.log('downloadFile');
				    		this.tempFilePath = res.tempFilePath;
				    		uni.getImageInfo({
				    		    src: this.tempFilePath,
				    		    success: (image) => {
				    				console.log(this.tempFilePath);
				    				// this.width=image.width+"px";
				    				// this.height=image.height+"px";
				    				// this.x=image.width/2;
				    				// this.y=image.height/2;
									let tmpW=uni.getSystemInfoSync().windowWidth;
				    		        console.log(image.width);
				    		        console.log(image.height);
									this.sysH=image.height/image.width*tmpW+"px";
									console.log(this.sysH);
				    		     },
				    			 fail:(res)=>{
				    				 console.log(res)
				    			 }
				    		});
				    	},							
						complete:(res)=>{
							uni.hideLoading();
						}
				});
					
				
				});
			},
			viewImage(){
			    this.show=true;
			},
			async ztap(){
				let param={
					server_Name:'ActivityServer',
					teller_Id:this.userInfo._id,
					teller_Name:this.userInfo.nickname,
					content_Id:this.vote.activityId,
					content:this.vote.title
				}
				this.newsCorrelations.dzCount=parseInt(this.newsCorrelations.dzCount)+1;
				console.log(param);
				let result=await this.$util.post('activityAgreeIns',param);
				this.$util.toast(this.$refs,result.rspCont,true,'success');
				if(result.rspCont=="投票成功"){				
					this.vote.agreeCount=parseInt(this.vote.agreeCount)+1;
				}
			},			
		}
	}
</script>

<style lang="scss">
    @import '@/common/uni-nvue.scss';
    @mixin flex {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: row;
    }
    @mixin height {
    	/* #ifndef APP-NVUE */
    	height: 100%;
    	/* #endif */
    	/* #ifdef APP-NVUE */
    	flex: 1;
    	/* #endif */
    }
    .box {
    	@include flex;
    }
    .button {
    	@include flex;
    	align-items: center;
    	justify-content: center;
    	flex: 1;
    	height: 35px;
    	margin: 0 5px;
    	border-radius: 5px;
    }
    
    .button-text {
    	color: #fff;
    	font-size: 12px;
    }
    .popup-content {
    	@include flex;
    	align-items: center;
    	justify-content: center;
    	padding: 15px;
    	height: 50px;
    	background-color: #fff;
    }
    .popup-height {
    	@include height;
    	width: 200px;
    }
    .text {
    	font-size: 12px;
    	color: #333;
    }
    .popup-success {
    	color: #fff;
    	background-color: #e1f3d8;
    }
    
    .popup-warn {
    	color: #fff;
    	background-color: #faecd8;
    }
    
    .popup-error {
    	color: #fff;
    	background-color: #fde2e2;
    }
    
    .popup-info {
    	color: #fff;
    	background-color: #f2f6fc;
    }
    .success-text {
    	color: #09bb07;
    }
    
    .warn-text {
    	color: #e6a23c;
    }
    
    .error-text {
    	color: #f56c6c;
    }
    
    .info-text {
    	color: #909399;
    }
    .dialog,
    .share {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: column;
    }
    .dialog .button,
    .share .button {
    	/* #ifndef APP-NVUE */
    	width: 100%;
    	/* #endif */
    	margin: 0;
    	margin-top: 10px;
    	padding: 3px 0;
    	flex: 1;
    }
    .dialog-text {
    	font-size: 14px;
    	color: #333;
    }
	page{
		height: 100%;
	}
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}
	.video-wrapper{
		height: 422upx;
		
		.video{
			width: 100%;
			height: 100%;
		}
	}
	.scroll{
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}
	.scroll-content{
		display: flex;
		flex-direction: column;
	}
	/* 简介 */
	.introduce-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 10upx 0upx 10upx;
		background: #fff;
		line-height: 1.5;
		
		.title{
			font-size: 36upx;
			color: #303133;
			margin-bottom: 16upx;
		}
		.introduce{
			display: flex;
			font-size: 26upx;
			color: #909399;
			text{
				margin-right: 16upx;
			}
		}
	}
	/* 点赞等操作 */
	.actions{
		display: flex;
		justify-content: space-around;
		align-items: center;
		line-height: 1.3;
		padding: 10upx 40upx 20upx;
	
		.action-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			color: #999;
		}
		.yticon{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 52upx;
			
			&.reverse{
				position: relative;
				top: 6upx;
				transform: scaleY(-1);
			}
			&.active{
				color: #ec706b;
			}
		}
		.icon-fenxiang2{
			font-weight: bold;
			font-size: 36upx;
		}
		.icon-shoucang{
			font-size: 44upx;
		}
	}

	.s-header{
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;
		
		&:before{
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}
	/* 推荐列表 */
	.rec-section{
		background-color: #fff;
		.rec-item{
			display: flex;
			padding: 20upx 30upx;
			position: relative;
			&:after{
				content: '';
				position: absolute;
				left: 30upx;
				right: 0;
				bottom: 0;
				height: 0;
				border-bottom: 1px solid #eee;
				transform: scaleY(50%);
			}
		}
		.left{
			flex: 1;
			padding-right: 10upx;
			overflow: hidden;
			position: relative;
			padding-bottom: 52upx;
			.title{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				font-size: 32upx;
				color: #303133;
				line-height: 44upx;
			}
			.bot{
				position: absolute;
				left: 0;
				bottom: 4upx;
				font-size: 26upx;
				color: #909399;
			}
			.time{
				margin-left: 20upx;
			}
		}
		.right{
			width: 220upx;
			height: 140upx;
			flex-shrink: 0;
			position: relative;
			.img{
				width: 100%;
				height: 100%;
			}
			
		}
	}
	/* 评论 */
	.evalution{
		display:flex;
		flex-direction:column;
		background: #fff;
		padding: 20upx 0;
	}
	
	.eva-item{
		display:flex;
		padding: 20upx 30upx;
		position: relative;
		image{
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}
		&:after{
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}
		&:last-child:after{
			border: 0;
		}
	}
	.eva-right{
		display:flex;
		flex-direction:column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position:relative;
		.zan-box{
			display:flex;
			align-items:base-line;
			position:absolute;
			top: 10upx;
			right: 10upx;
			.yticon{
				margin-left: 8upx; 
			}
		}
		.content{
			font-size: 28upx;
			color: #333;
			padding-top:20upx;
		}
	}
	
	/* 底部 */
	.bottom{
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0,0,0,.04); 
		position: relative;
		z-index: 1;
		
		.input-box{
			display: flex;
			align-items: center;
			flex: 1;
			height: 60upx;
			background: #f2f3f3;
			border-radius: 100px;
			padding-left: 30upx;
			
			.icon-huifu{
				font-size: 28upx;
				color: #909399;
			}
			.input{
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}
		}
		.confirm-btn{
			font-size: 30upx;
			padding-left: 20upx;
			color: #0d9fff;
		}
	    .yticon{
	    	display: flex;
	    	align-items: center;
	    	justify-content: center;
	    	width: 600upx;
	    	height: 600upx;
	    	font-size: 52upx;
	    	
	    	&.reverse{
	    		position: relative;
	    		top: 6upx;
	    		transform: scaleY(-1);
	    	}
	    	&.active{
	    		color: #ec706b;
	    	}
	    }
	}
	.area{
		width:100%;
		height:600px;
		display: flex;
		flex-direction: column;
		background-color: #000000;
	}
	.mview{
		width:100%;
		height:200px; 
		align-items: center;
		justify-content: center;
		position: relative;
		margin: auto;

	}
	.imgVote{
		width: 100%;
		margin-top: 30px;
	}
</style>
