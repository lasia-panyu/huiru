<template>
	<view>
		<pangu-advert ></pangu-advert>
		<view v:if="examsessions">
		<view class="marg">
		<u-toast ref="uToast" />
		<view class="u-demo-area">
				<u-button @click="enterexam"   :plain="plain" shape="circle" :ripple='ripple' type="primary">开始考试</u-button>
		</view>
		</view>
	    <pangu-card :lists="examsessions" :keys="keys" :title="title" @confirm="confirm">	
	    </pangu-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plain:false,
				ripple:true,
				title:"考试场次",
				examsessions:this.$util.examsessions,
				keys:['s_id','','s_start_Time','time_Length'],
				userInfo:{}
			}
		},
		async onLoad() {
		   this.userInfo=await this.$util.getUser(this);
		   this.$util.examsessions=await this.$util.post("tellerScene",{teller_id:this.userInfo._id	});		   
		   console.log(this.$util.examsessions);
		   let result=this.$util.examsessions;
		   this.examsessions=result.map(
		     x=>{			
				x['s_start_Time']=x['s_start_Time'].replace(/(\d\d)(\d\d)/,"$1:$2");
				x['time_Length']='考试日期'+x['s_date']+x['s_time_Length'].replace(/(\d*)/,",总时长共$1分钟,请留意剩余时间!");
				return x;
			 } 
		   )
		   console.log(this.$util.examsessions);
		   console.log(this.examsessions);
		},
		methods: {
			async enterexam(){			
				let result=await this.$util.post("examKnow",{Teller_id:this.userInfo._id}); 	
			    console.log(result);
				console.log(result['question'].length)
				if(!result||result['question'].length==0){
					this.$util.toast(this.$refs,"考试已经全部作答！",true,'error');
					return;
				}
				let session=this.$util.examsessions.filter(x => x['s_id'] == result['sid'])[0];
				let startDate=(session['s_date']+session['s_start_Time']).replace(/(\d\d)(\d\d)(\d\d)(\d\d):(\d\d)/,"$1-$2-$3 $4:$5:00");
				let startTime=new Date(startDate);
				let endTime=new Date(startDate);
				endTime.setMinutes(endTime.getMinutes()+parseInt(session['s_time_Length']));
				let date=new Date();
				if(date.getTime()<startTime.getTime()){
					this.$util.toast(this.$refs,"未在开始时间范围内，不能作答！",true,'error');
				}else if(date.getTime()>=endTime.getTime()){
					this.$util.toast(this.$refs,"考试时间已经结束，不能作答！",true,'error');
				}else{
                    let actualEndDate=this.format(date);
					actualEndDate=new Date(actualEndDate);
					let useTime=parseInt(result['usetime'])/60;
					actualEndDate.setSeconds(actualEndDate.getSeconds()+parseInt(result['usetime']));
					//actualEndDate.setMinutes(actualEndDate.getMinutes()+useTime);
					console.log(result['usetime']);
					console.log(this.format(date));
					console.log(this.format(actualEndDate));;

					if(!this.$util.exam[result['sid']]){
						this.$util.exam[result['sid']]={'exam':result['question'],'startTime':this.format(date),'endTime':this.format(actualEndDate)};
					}
					this.$util.examconf['sid']=result['sid'];
					this.$util.examconf['index']=0;
					this.$u.route('/pages/exam/exam?sid='+result['sid'])
				}
			
			},
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
			 }
		}
	}
</script>

<style>
	.marg{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
