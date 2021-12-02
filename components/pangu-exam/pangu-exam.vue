<template>
	<view >
		<view class="header" id="header" style="display: flex; flex-direction: row; ">
			<span style="margin-left: 0px;" >
			<pangu-countdown v-if='endTime' :startTime='startTime' :endTime='endTime' v-on:confirm='confirm'>
				
			</pangu-countdown>
			</span>
			<span style="margin-left: 15%;">第{{currentIndex+1}}题	</span>
			<span class="header-button" @click='handleSubmit' v-if='endTime'>交卷</span>
		</view>
		<view id="subHeader">
		 	<view class="sub-header" v-if='question.length>0'>
				<span class='sub-header-type' v-if='question[currentIndex].qtype==1'>单择题</span>
				<span class='sub-header-type' v-if='question[currentIndex].qtype==2'>多选题</span>
				<span class='sub-header-type' v-if='question[currentIndex].qtype==3'>判断题</span>
				<span class='sub-header-number'>{{currentIndex+1}}/{{question.length}} 题</span>
			</view>
		</view>
			<swiper class="content" :duration='duration' :current=currentIndex @change='handleSwiperChanged' v-if='question.length>0' :style="{'height':swiperHeight}">
				<template v-for='item in question'>
					<swiper-item class="content-item">
						<scroll-view scroll-y :style="{'height':swiperHeight}">
							<view class="content-title">{{item.subject}}</view>
							
							<view class="content-solutions" v-if='item.qtype == 1 ||item.qtype == 2 '>							
								<template v-for='(subItem,key) in item'>
									<view v-if="(key=='optionA'||key=='optionB'||key=='optionC'||key=='optionD'||key=='optionE')&&subItem" class="content-solutions-item" >
									    <view :class="[item['answer'][key] ? 'content-solutions-item-select' : '']" class="content-solutions-item-check-content"  @click='chooseSolution(key,item)' >
										{{key.substring(6)}}.{{subItem}}</view>
									</view> 
								</template>
							</view>
							<view class="content-solutions" v-else-if='item.qtype == 3'>
											<view class="content-solutions-item" >
											  <view :class="[item['answer']['optionA'] ? 'content-solutions-item-select' : '']" class="content-solutions-item-check-content"  @click='chooseSolution("optionA",item)' >是</view>
											</view> 
											<view class="content-solutions-item" >
											  <view :class="[item['answer']['optionB'] ? 'content-solutions-item-select' : '']" class="content-solutions-item-check-content"  @click='chooseSolution("optionB",item)' >否</view>
											</view>									 
							</view> 
							<view class="content-item-explain" v-if='item.explain'>
								<view class="content-item-explain-result">正确答案是<span>{{item.explain}}</span> </view>
								<view>解析:</view>
								<view class="content-item-explain-content">暂无解析</view>
							</view>
						</scroll-view>
					</swiper-item>
				</template>
			</swiper>
	
		
		<view class="footer" id="footer">
			<view class="footer-back" @click='handleChangeCurrentSwiper(-1)'>上一题</view>
			<view class="footer-card" @click="showQuestion = !showQuestion">答题卡</view>
			<view class="footer-right" @click='handleChangeCurrentSwiper(1)'>下一题</view>
		</view>
		
		<modal v-model="showQuestion">
			<view class='question-modal' :style="{'height': modalHeight}">
				<view class="question-modal-header" id="questionHeader">
					答题卡
				</view>
				<scroll-view scroll-y class="question-modal-body" :style="{'height': modalContentHeight}">
					<template v-for="(item, index) in question">
<!-- 						<view v-if='item.userAnswer && item.answer==item.userAnswer && isReviewed' class="question-modal-body-item question-modal-body-item-right" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else-if='item.userAnswer && isReviewed' class="question-modal-body-item question-modal-body-item-failed" @click="handleJumpSwiper(index)">{{index + 1 }}</view> -->
						<view v-if="item['answer']['optionA']||item['answer']['optionB']||item['answer']['optionC']||item['answer']['optionD']||item['answer']['optionE']" class="question-modal-body-item question-modal-body-item-select" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else class="question-modal-body-item" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
					</template>
				</scroll-view>
			</view>
		</modal>
	</view>
</template>

<script>
	import Modal from '../../components/pangu-exam/pangu-modal.vue'
	export default {
		data() {
			return {				    
				swiperHeight:'100%' ,
				modalHeight: '100%',
				modalContentHeight: '100%',
				showQuestion: false,
				isReviewed:false
			}
		},
		computed:{ //计算函数，复杂的计算都应该放在这里，尽量不要直接在模板语法里面计算，在此处计算的值是会动态变的，即计算的数中有一个值变了，最终结果也会跟着变，类似于封装的计算函数
		    startTime:function(){ //addnum可以直接在模板语法里面用，相当于data内的值
		        return this.format(new Date());
		    }
		},
		onLoad(){
			console.log(this.$util.exam);
			console.log(this.$util.examconf);
			this.setAnswerHeight();
			console.log(this.swiperHeight)
			//this.question=this.$util.exam[this.sid]['question'];
		},
		filters:{
			rightAnswerFilter(item){
				if(item.type == 1){
					switch(item.answer){
						case 'A': return '对';
						case 'B': return '错';
					}
				}else {
					return item.answer
				}
			}
		},
		watch:{
			currentSwiperItem(val){
				this.currentIndex = val
			}
		},
		props:{
			show:'',
			endTime:'',
			answer:{},
			question:{},
			currentIndex: 0,
			currentSwiperItem: {
				type: [String, Number],
				default: 0
			},
			duration: {
				type: [String, Number],
				default: 300
			},
			
			questtionList: {				
				type: Array
			}
		},
		mounted(){
			this.setAnswerHeight()
		},
		components:{
			Modal
		},
		methods: {
			format(date){
			            var y = date.getFullYear(); 
			            var m = date.getMonth() + 1;  
			                m = m < 10 ? ('0' + m) : m;  
			            var d = date.getDate();  
			                d = d < 10 ? ('0' + d) : d;  
			            var h = date.getHours();  
			                h=h < 10 ? ('0' + h) : h;  
			            var minute = date.getMinutes();  
			                minute = minute < 10 ? ('0' + minute) : minute;  
			            var second=date.getSeconds();  
			                second=second < 10 ? ('0' + second) : second;  
			            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
			 },
			/*设置题目的高度
			 */
			setAnswerHeight(){
				let that = this
				let tempHeight = 0
			    let res=uni.getSystemInfoSync();
					//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
	            console.log("setAnswerHeight")
						tempHeight = res.windowHeight;
						that.modalHeight = res.windowHeight - uni.upx2px(200) + 'px';
						that.modalContentHeight = res.windowHeight - uni.upx2px(380) + 'px';
						console.log(tempHeight);
						console.log(that.modalHeight);
						console.log(that.modalContentHeight);
						//that.swiperHeight = that.modalContentHeight;
						// console.log(uni.createSelectorQuery().select("#header"));
						uni.createSelectorQuery().in(this).select("#header").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							console.log(data.height);
							uni.createSelectorQuery().in(this).select("#subHeader").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								tempHeight -= data.height;
								console.log(data.height);
								uni.createSelectorQuery().in(this).select("#footer").fields({
									size: true,
									scrollOffset: true
								}, (data) => {
									tempHeight -= data.height;
									console.log(data.height);
									console.log("tempHeight:"+tempHeight);
									that.swiperHeight = tempHeight + 'px';
								}).exec();
							}).exec();
						}).exec();		
			},
			/*跳转指定题目
			* */
			handleJumpSwiper(index){
				this.$emit("handleJumpSwiper",index)
				this.showQuestion = false
			},
			/* 滑动题目
			 */
			handleSwiperChanged(event){
				this.$emit("handleSwiperChanged",event)
			},
			/* 调用上一页，下一页
			 */
			handleChangeCurrentSwiper(operation){
				this.$emit("handleChangeCurrentSwiper",operation)
			},  
			/* 选择答案（单选，判断）
			 */
			chooseSolution(key,item){
				this.$emit("chooseSolution",key,item)
				
			},
			async confirm(){
				console.log("confirm");
				this.$emit("confirm")
			},
			handleSubmit(){
				console.log("handleSubmit");
				this.$emit("handleSubmit")
			},
			/* 选择答案（多选）
			 */
			chooseMutiSolution(item, subItem){
				if(!this.isReviewed){
					let newAnswer = JSON.parse(JSON.stringify(item.userAnswer))
					if(newAnswer.indexOf(subItem.id) > -1){
						newAnswer = newAnswer.replace(subItem.id, '')
					} else{
						newAnswer +=subItem.id
					}
					let splitArray = newAnswer.split('')
					let noFormString = splitArray.sort().toString().replace(/,/g, '')
					item.userAnswer = noFormString
					this.onAnswerChange(item)
				}
				
				
			},
			/* 题目答案变化
			 */
			onAnswerChange(item){
				let result = JSON.parse(JSON.stringify(item))
				this.$emit('onChange', item)
			},

		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
#header, #subHeader{
	height: 100rpx;
}
.header{
	position: relative;
	text-align: center;
	line-height: 100rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #ADC0F1;
	letter-spacing: 10rpx;
	&-button{
		width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		position: absolute;
		top: 20rpx;
		right: 40rpx;
		padding: 10rpx 20rpx;
		border-radius: 15rpx;
		letter-spacing: 2rpx;
		font-weight: 500;
		color: #FFFFFF;
		background-color: #ADC0F1;
	}
}
.sub-header{
	padding: 30rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ADC0F1;
}
.content{
	letter-spacing: 3rpx;
	&-item-explain{
		padding-bottom: 20rpx;
		font-size: 30rpx;
		color: #8799a3;
		letter-spacing: 5rpx;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		&-result{
			padding: 20rpx 0;
			span{
				padding-left: 20rpx;
				color: #39b54a;
			}
		}
		&-content{
			padding: 20rpx 0;
		}
	}
	&-item{
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	&-title{
		margin-bottom: 30rpx;
		font-size: 32rpx;
		line-height: 55rpx;
		color: #4c8af3
	}
	&-solutions{
		width: 100%;
		padding-bottom: 20rpx;
		&-item{
			margin: 60rpx 0;
			border: 5rpx solid #ADC0F1;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			background-color: #ADC0F1;
			&-check-content{
				padding: 35rpx 20rpx;
				width: 100%;
				border-radius: 15rpx;
				color: #4c8af3;
				background-color: #FFFFFF;
			}
			&-single{
				width: 80rpx;
				text-align: center;
				color: #FFFFFF;
			}
			
			&-content{
				padding: 35rpx 20rpx;
				width: 630rpx;
				border-top-right-radius: 15rpx;
				border-bottom-right-radius: 15rpx;
				color: #3F8FFF;
				background-color: #FFFFFF;
			}
			&-select{
				color: #FFFFFF;
				background-color: #ADC0F1;
			}
		}
	}
}
.footer{
	width: 750rpx;
	height: 100rpx;
	padding: 30rpx 20rpx;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	bottom: 0;
	font-size: 30rpx;
	box-sizing: border-box;
	color: #4c8af3;
	box-shadow: 0 -5rpx 5rpx #ADC0F1;
	&-card{
		padding: 10rpx 20rpx;
		border: 1px solid #ADC0F1;
		border-radius: 15rpx;
		color: #FFFFFF;
		background-color: #ADC0F1;
	}
}
.question-modal{
	width: 700rpx;
	padding: 40rpx;
	background-color: #FFFFFF;
	&-header{
		height: 100rpx;
		text-align: center;
		font-size: 35rpx;
		line-height: 100rpx;
		color: #333333;
		border-bottom: 1rpx solid #F0F0F0;
	}
	&-body{
		&-item{
			width: 80rpx;
			margin: 10rpx 22rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 35rpx;
			display: inline-block;
			text-align: center;
			border-radius: 50%;
			color: #8799a3;
		}
		&-item-failed{
			color: #FFFFFF;
			background-color: #982121;
		}
		&-item-right{
			color: #FFFFFF;
			background-color: #39b54a;
		}
		&-item-select{
			color: #FFFFFF;
			background-color: #ADC0F1;
		}
	}
}
.right{
	border: 5rpx solid #39b54a;
}

</style>
