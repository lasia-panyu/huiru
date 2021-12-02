<template>
	<view>
	
		<u-toast ref="uToast" />	
		<pangu-exam :sid='sid' :question='question'  :currentIndex='currentIndex' :answer='answer' :endTime='endTime'  
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
			show:'false',
			endTime:null,
			answer:{'optionA':'A','optionB':'B','optionC':'C','optionD':'D','optionE':'E'},
			question:this.$util.questiontest,
			currentIndex: 0,
			show: false,
			content:'请确认提交答案!',
			sid:'',
			userInfo:{},
			}
	},
	async onLoad(){
		 this.userInfo=await this.$util.getUser(this);
	} ,
	onShow: function (){
		console.log("onShow");
	},
	watch:{
		currentIndex: {
		        async handler (newName, oldName) {
		            let result=await this.$util.post("judgeExamKnowledge",{teller_id:this.userInfo._id});
		            console.log(result);
		            if(!result){
		            	this.$util.toast(this.$refs,"考试进行中，不能使用此功能！",true,'error');
						setTimeout(()=> {
								this.$u.route({type:"navigateBack",url:"/pages/exam/examtestselect"});
						},1000);			
		            	return;
		            }		
		        },
		        immediate: true
		}
	},
	/* 提交答案*/
		
	methods:{

	    chooseSolution(msg){
		let key=msg[0]
		let keyCus=msg[0].replace('option','');
		let item=msg[1];
		if(!item['answerR']){
			item['answerR']=item['answer'];
			if(item['answerR']=='0')
			  item['answerR']='A';
			 if(item['answerR']=='1')
			  item['answerR']='B';			  
			this.question[this.currentIndex]['answerR']=item['answerR'];
		}

		let answer={'optionA':false,'optionB':false,'optionC':false,'optionD':false,'optionE':false};
		if(this.$util.questiontest[this.currentIndex]['qtype']==1||this.$util.questiontest[this.currentIndex]['qtype']==3){	
			if(keyCus==item['answerR']){
				this.$util.toast(this.$refs,"回答正确！",true,'success');
				this.$util.post('studySave',{flag:0,teller_id:this.userInfo._id,id:item.id})
	            if(this.currentIndex<this.$util.questiontest.length-1){
					setTimeout(()=> {
							this.currentIndex +=1
					},300)
					// this.onAnswerChange(item);	
				}else{
				}
				
			}else{
				this.$util.toast(this.$refs,"回答错误！",true,'error');
		
				this.$util.questiontest[this.currentIndex]['explain']=item['answerR'];
				this.question[this.currentIndex]['explain']=item['answerR'];
				if(this.$util.questiontest[this.currentIndex]['qtype']==3){
					this.$util.questiontest[this.currentIndex]['explain']=item['answerR']=='A'?"是":"否";
					this.question[this.currentIndex]['explain']=item['answerR']=='A'?"是":"否";
				}
			}
			
			if(this.$util.questiontest[this.currentIndex]["answer"][key]){
				answer[key]=false
			}else{
				answer[key]=true
			}
			console.log("line49");
			this.$util.questiontest[this.currentIndex]["answer"]=answer;
			console.log(this.$util.questiontest[this.currentIndex]["answer"])
		}else if(this.$util.questiontest[this.currentIndex]['qtype']==2){	
			this.$util.questiontest[this.currentIndex]['explain']=item['answerR'];
			if(this.$util.questiontest[this.currentIndex]["answer"].constructor==String){
				this.$util.questiontest[this.currentIndex]["answer"]=answer;
			}
			
			this.$util.questiontest[this.currentIndex]["answer"][key]=!this.$util.questiontest[this.currentIndex]["answer"][key]

			let result=this.$util.questiontest[this.currentIndex]["answer"];
			let ans="";
			Object.keys(result).forEach((key) => {
			  if(result[key]){
				 ans+=key.replace("option","")
			  }			 
			});
			if(ans==item['answerR']){
				this.$util.toast(this.$refs,"回答正确！",true,'success');
				this.$util.post('studySave',{flag:0,teller_id:this.userInfo._id	,id:item.id})
			    if(this.currentIndex<this.$util.questiontest.length-1){
					setTimeout(()=> {
							this.currentIndex +=1
					},300)
					// this.onAnswerChange(item);	
				}else{
				}
				
			}else{
				// this.$util.toast(this.$refs,"回答错误！",true,'error');
	           
			}
			console.log(ans) // foo
		}
		
		this.question[this.currentIndex]["answer"]=this.$util.questiontest[this.currentIndex]["answer"]

		console.log(this.question);
					
	   },
	   handleSwiperChanged(event){
		event=event[0]
	   	this.currentIndex = event.detail.current
	   },
	   handleJumpSwiper(event){
		console.log(event);
		event=event[0]
		this.currentIndex = event
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

    }		
}
</script>

<style>
</style>
