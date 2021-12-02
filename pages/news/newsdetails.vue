<template>
	<view class="content" id="pagecontent">
	    <u-toast ref="uToast" />
		<scroll-view class="scroll" scroll-y>
			
			<view class="scroll-content">
				<view class="introduce-section">
					<view v-if="news.imgPath.length === 1 && news.mode===3 ">
						<view class="video-wrapper">
							<video 
								class="video"
								:src="news.brief.video" 
								controls
								objectFit="fill"
								:autoplay="false"
							></video>
						</view>
						<view class="introduce">
							<text class="introducevideo"></text>
							<text class="yticon icon-xia show-icon"></text>
						</view>
					</view>
					<view v-else>
						<text class="title">{{news.title}}</text>
						<view class="introduce">
							<text>{{news.brief.name}}</text>
							<text>{{news.view_count}}阅读</text>
							<text>
								<uni-dateformat :date="news.publish_date" format="yyyy-MM-dd"
									:threshold="[60000, 2592000000]" />
							</text>
						</view>
						
						<rich-text :nodes="news.content"></rich-text>
					</view>
				
					
					<view class="actions" >
					<!-- 	{
							"like_count":like_count.total,
							"collect_count":collect_count,
							"own_like":own_like.total,
							"own_collect":own_collect
						}; -->
                        <view class="action-item" @click="opSet('like')">
							<text :class="newsDetails.own_like==0 ? 'yticon icon-dianzan-ash':'yticon icon-dianzan-ash active'"></text>
							<text>{{newsDetails.like_count}}</text>
						</view>
						
					<!-- 	<view class="action-item">
							<text class="yticon icon-dianzan-ash reverse"></text>
							<text>6</text>
						</view> -->
						<view class="action-item">
							<text class="yticon icon-fenxiang2"></text>
							<text>分享</text>
						</view>
						<view class="action-item" @click="opSet('collect')">
							<text :class="newsDetails.own_collect==0?'yticon icon-shoucang ':'yticon icon-shoucang active'"></text>
							<text>{{newsDetails.collect_count}}</text>
						</view>
					</view>
				</view>
				
				<view class="container" >
					<!-- 推荐 -->
					<view class="s-header">
						<text class="tit">相关推荐</text>
					</view>
					
					<unicloud-db v-slot:default="{data, loading, error, options}"
						collection="opendb-news-articles" :where="`category_id=='${news.category_id}'`" page-data="add"
						:page-current=1 :page-size=5 getcount="true" orderby="publish_date desc">
					     <view v-if="error">{{error.message}}</view>
					     <view v-else-if="loading">正在加载...</view>
					     <view v-else>
					           <view class="rec-section" v-for="item in data" :key="item._id" @click="navinews(item)">
					           	<view class="rec-item">
					           		<view class="left">
					           			<text class="title">{{item.title}}</text>
					           			<view class="bot">
					           				<text class="author">{{item.brief.name}}</text>
					           				<text class="time">{{item.time}}</text>
					           			</view>
					           		</view>
					           		<view class="right" v-if="item.imgPath.length > 0">
					           			<image class="img" :src="item.imgPath[0]" mode="aspectFill"></image>
					           		</view>
					           	</view>
					           </view>
					     </view>
					</unicloud-db>
						

					
					<!-- 评论 -->
					<view class="s-header">
						<text class="tit">观点</text>
					</view>
					<fuyin-comments :news="news"></fuyin-comments>
					<view class="evalution">
						<unicloud-db  ref="comment"  v-slot:default="{data, loading, error, options}"
							collection="opendb-news-comments" :where="`article_id=='${news._id}'`"  orderby="comment_date desc">
						<view v-if="error">{{error.message}}</view>
					    <view v-else-if="loading">正在加载...</view>
						<view v-else v-for="(item, index) in data" :key="index"
					    	class="eva-item"
					    >
						    <image v-if="item.avatar" :src="item.avatar" mode="aspectFill"></image>
					    	<image v-else src="../../static/u24.jpg" mode="aspectFill"></image>
					    	<view class="eva-right">
					    		<text>{{item.brief.name}}</text>
					    		<uni-dateformat :date="item.comment_date" format="yyyy-MM-dd"
					    			:threshold="[60000, 2592000000]" />
					    		<text>{{item.time}}</text>
					    		<view class="zan-box">					    			
					    			<!-- <text class="yticon icon-shoucang active"></text>
									<text>{{item.like_count}}</text> -->	
									<block v-if="user._id==item.brief.id">
										 <u-icon name="close" @click="deleteComments(item)"></u-icon>
										 <text @click="deleteComments(item)">删除</text>
									</block>				 
					    		</view>
							
					    		<text class="content">{{item.comment_content}}</text>
					    	</view>
					    </view>
						</unicloud-db>				
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="bottom" style="height: 35px;">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input 
					class="input"
					type="text" 
					placeholder="点评一下把.." 
					placeholder-style="color:#adb1b9;"
					v-model="commentOwn" style="height: 35px;"/>
			</view>
			<text class="confirm-btn" @tap="comment">提交</text>
		</view>	
	</view>
</template>

<script>
import parseHtml from './html-parser.js';
const db = uniCloud.database();
	export default {
		data() {
			return {
				news:this.$util.news,
				styleComment:{},
				commentOwn:"",
				user:{},
				newsDetails:{}
			}
		},
		watch: {
			newsDetails: { //深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					console.log(val);
				},
				deep: true //true 深度监听
			}
		},
		async onLoad(options){	
			uni.showLoading();
			let user=await this.$util.cloudFunction('uni-id-cf','getCurrentUserInfo',{});
			this.user=user.userInfo;
			let param={
				"user_id":this.user._id,
				"article_id":this.news._id
			};
			let newsDetails=await this.$util.cloudFunction('news','newsDetail',param);
			this.newsDetails=newsDetails;
			// this.$set(this.newsd)
			// console.log(this.newsDetails);
			let width=(uni.getSystemInfoSync().windowWidth-30)+"px";
			// let news_cotent=this.news.content.toString();
			// console.log('<img style="margin:auto;height:auto;width:'+width+'"  src');
			// let reg1='<img src';
			// console.log(reg1)
			// news_cotent=news_cotent.replace(/<img src/g ,'<img style="margin:auto;height:auto;width:'+width+'"  src');
			// news_cotent=news_cotent.replace(/text-indent: \d*px/gs,'text-indent: 0px');
			// this.news.content=news_cotent;
			// console.log(this.news.content);
			uni.hideLoading();
			// this.news.content=parseHtml(this.news.content);
			// console.log(this.news.content);
			
		},
		methods: {
			navinews(item){
				this.$util.news=item;
				this.news=item;
			    this.$u.route({"url":"/pages/news/newsdetails","type":"redirect"});
			},
			async opSet(type){
				uni.showLoading();
				console.log(this.user);
				console.log(this.news);
				let param={
					"user_id":this.user._id,
					"article_id":this.news._id,
					"own_collect":this.newsDetails.own_collect,
					"own_like":this.newsDetails.own_like,
					"type":{'type':type,'own':this.newsDetails["own_"+type]}
				};	
				console.log(param);
				let result=await this.$util.cloudFunction("news","opSet",param);
				if(result.code==0){
					let title=""
					if(type=="like"){
						title=this.newsDetails.own_like==0?"点赞":"取消点赞";	
						this.newsDetails.like_count=this.newsDetails.own_like==0?this.newsDetails.like_count+1:this.newsDetails.like_count-1;
						this.newsDetails.like_count=this.newsDetails.like_count>0?this.newsDetails.like_count:0;
						this.newsDetails.own_like=this.newsDetails.own_like==0?1:0;
					}else{
						title=this.newsDetails.own_collect==0?"收藏":"取消收藏";
						this.newsDetails.collect_count=this.newsDetails.own_collect==0?this.newsDetails.collect_count+1:this.newsDetails.collect_count-1;
						this.newsDetails.collect_count=this.newsDetails.collect_count>0?this.newsDetails.collect_count:0;
						this.newsDetails.own_collect=this.newsDetails.own_collect==0?1:0;
					}
					this.$refs.uToast.show({
						title: title+'成功',
					});
				    
				}
				uni.hideLoading();
			},
			async comment(){;
			    uni.showLoading();
				let comment={
					"comment_content":this.commentOwn,
					"article_id":this.news._id,
					// "comment_date":new Date().getTime(),
					"brief":{"id":this.user._id,"name":this.user.nickname,"avatarUrl":""},
					"comment_type":0,
					"like_count":0,
				}
				db.collection('opendb-news-comments').add(comment).then((res) => {
						this.$refs.uToast.show({
							title: '评论成功',
						});
						this.$refs.comment.loadData({
						  "clear":true
						}) 
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(() => {
						uni.hideLoading()
				})
			},
			async deleteComments(item){
				uni.showLoading();
				db.collection('opendb-news-comments').doc(item._id).remove().then((res) => {
							uni.showToast({
								title: '删除成功'
							})
							this.$refs.comment.loadData({
							  "clear":true
							}); 
						}).catch((err) => {
							uni.showModal({
								content: err.message || '请求服务失败',
								showCancel: false
							})
						}).finally(() => {
							uni.hideLoading()
					    })
			}
			 
		}
	}
</script>

<style lang="scss">
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
		padding: 20upx 30upx;
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
			flex-direction:row;
			text{
				margin-right: 16upx;
			}
		}
		.introducevideo{
					display: flex;
					font-size: 26upx;
					color: #909399;
					
					.show-icon{
						font-size: 34upx;
						padding-left: 10upx;
					}
				}
	}
	/* 点赞等操作 */
	.actions{
		display: flex;
		flex-direction: row;
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
		display: flex;
		flex-direction: row;
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;
		height: auto;
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
			flex-direction: row;
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
		flex-direction: row;
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
		    flex-direction:row;
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
		flex-direction: row;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0,0,0,.04); 
		position: relative;
		z-index: 1;
		
		.input-box{
			display: flex;
			flex-direction: row;
			align-items: center;
			flex: 1;
			background: #f2f3f3;
			border-radius:100px;
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
	}
	.video-wrapper{
		height: 422upx;
		
		.video{
			width: 100%;
			height: 100%;
		}
	}
</style>
