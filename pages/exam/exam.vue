<template>
	<view>
		    <u-modal ref="uModal" v-model="show" :show-cancel-button="true"
			:show-title="true" :async-close="true"
			@confirm="confirm" :content="content"
		    >
            </u-modal>
		<pangu-exam :sid='sid' :question='question' :currentIndex='currentIndex' :answer='answer' :endTime='endTime' 
		 v-on:handleSubmit='handleSubmit'
		 v-on:confirm='confirm'
		 v-on:chooseSolution='chooseSolution(arguments)'
		 v-on:handleChangeCurrentSwiper='handleChangeCurrentSwiper(arguments)' 
		 v-on:handleSwiperChanged='handleSwiperChanged(arguments)' 
		 v-on:handleJumpSwiper='handleJumpSwiper(arguments)'>
        </pangu-exam>
	</view>
</template>

<script>
	export default {
	data() {
		return {
			endTime:this.$util.exam[this.$util.examconf['sid']]['endTime'],
			answer:{'optionA':'A','optionB':'B','optionC':'C','optionD':'D','optionE':'E'},
			question:this.$util.exam[this.$util.examconf['sid']]['exam'],
			currentIndex: 0,
			show: false,
			content:'请确认提交答案!',
			sid:'',
			userInfo:{}
			}
	},
	async onLoad(){		   
		    this.userInfo=await this.$util.getUser(this);
		    this.sid=option.sid;	
	} ,
	/* 提交答案*/
		
	methods:{
		handleSubmit(){
			this.show = true;
		},
	    chooseSolution(msg){
		let key=msg[0];
		let item=msg[1];
		console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]);
		console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]);
		let answer={'optionA':false,'optionB':false,'optionC':false,'optionD':false,'optionE':false};
		if(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]['qtype']==1||this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]['qtype']==3){				
			if(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"][key]){
				answer[key]=false
			}else{
				answer[key]=true
			}
			this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]=answer;
		}else if(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]['qtype']==2){		
			console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]==undefined);
			console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]==null);
			console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]=='');
			console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]==' ');
			this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]=this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]==''?answer:this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]
			 console.log(this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"]);
			this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"][key]=!this.$util.exam[this.$util.examconf['sid']]['exam'][this.currentIndex]["answer"][key];
		   
		}
		
		this.question=this.$util.exam[this.$util.examconf['sid']]['exam']
		// setTimeout(()=> {
		// 		this.currentIndex +=1
		// },300)
			// this.onAnswerChange(item)
					
	   },
	   handleSwiperChanged(event){
		event=event[0]
	   	this.currentIndex = event.detail.current
	   },
	   /* 调用上一页，下一页
	    */
	   handleChangeCurrentSwiper(operation){
		operation=operation[0]
	   	let max = this.question.length -1
	   	let min = 0
	   	if((this.currentIndex>min && operation<0) || (this.currentIndex<max&&operation>0) ){
	   		this.currentIndex += operation
	   		console.log(this.currentIndex)
	   	}
	   }, 
	   handleJumpSwiper(index){
	   	this.currentIndex = index[0]
	   },
		async confirm() {
				console.log(this.$util.exam[this.$util.examconf['sid']]['exam']);
				let result=this.$util.exam[this.$util.examconf['sid']]['exam'];
				let tmpM={'optionA':'A','optionB':'B','optionC':'C','optionD':'D','optionE':'E'};
				let tmp1=result.map(x =>{
					let anwser='';
					let r={};
					for(let key in x['answer']){
						console.log(x['answer'])
						console.log(key)
						console.log(x['answer'][key])
						anwser+=!x['answer'][key]?'':tmpM[key];			
					}
					r['id']=x['id']+':'+anwser;
					r['qtype']=x['qtype']
					return r;
				});
				let param={
					              teller_Id:this.userInfo._id,
					              s_Id:this.$util.examconf['sid'],
					              use_Time:(new Date().getTime()-new Date(this.$util.exam[this.$util.examconf['sid']]['startTime']))/1000+'',
					              k_Single:tmp1.filter(x=>x.qtype==1).map(x=>x.id).join("|"),
					              k_Multi:tmp1.filter(x=>x.qtype==2).map(x=>x.id).join("|"),
					              k_Jug:tmp1.filter(x=>x.qtype==3).map(x=>{
									 return x.id.replace('A',1).replace('B',0);
								  }).join("|"),
					              k_Brief:'',
					              re_score:'',
					              g_Teacher:''
				};
				console.log(param);
				let examresult=await this.$util.post('saveAll',param);
				console.log(examresult);
				let that =this ;
				if(examresult){
					examresult=await this.$util.post('createKnlMark',{'sce_id':this.$util.examconf['sid'],'teller_id':this.userInfo._id});
					console.log(examresult);	
					this.show = false;
					uni.showModal({
					    title: '考试成绩',
					    content: '用户：'+examresult['teller_id']+'试卷总成绩：'+examresult['e_total']+'；本次成绩为：'+examresult['e_mark']+'；',
					    success: function (res) {							
					        if (res.confirm) {
								that.$u.route({type:'switchTab',url:"/pages/index/index"});
					        } else if (res.cancel) {
								that.$u.route({type:'switchTab',url:"/pages/index/index"});
					        }
					    }
					});
				}
			},
	}
}
</script>

<style>
</style>
