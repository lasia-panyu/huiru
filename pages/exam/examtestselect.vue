<template>
	<view class="wrap">
		    <u-form :model="forms" :rules="rules" ref="uForm" :errorType="errorType" >
				<u-form-item :label-position="labelPosition" label="题型"  label-width="150" prop="qtypes">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.qtypes" placeholder="题型" @click="click('qtypes')"></u-input>
				</u-form-item>
			<u-form-item :label-position="labelPosition" label="业务类型"  label-width="150" prop="bttype">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.bttype" placeholder="业务类型" @click="click('bttype')"></u-input>
			</u-form-item>	
            <u-toast ref="uToast" />	
<!-- 			<u-form-item :label-position="labelPosition" label="题目难度"  label-width="150" prop="qlevels">
			 		<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.qlevels" placeholder="请选择题目难度" @click="click('qlevels')"></u-input>
			</u-form-item> -->
			<u-form-item :label-position="labelPosition" label="是否学习过"  label-width="150" prop="flags">
						<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.flags" placeholder="请选择状态类型" @click="click('flags')"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="习题数目"  label-width="150" prop="num">
					<u-input :border="border" type="number" v-model="forms.num" placeholder="请输入题目个数" ></u-input>
			</u-form-item>					
			 <u-button  type="primary"  @click="submit">提交</u-button>
			</u-form>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>

</template>

<script>
export default{
	data() {
		
		return {
			border: false,
			labelPosition: 'left',
			actionSheetList:[],
			actionSheetShow:false,
			currentType:'',
			qtypes:'',
			qlevels:'',
			flags:'',
			btypeTrue:'',
			bttype:'',
			listMap:{
				'bttype':[],
				'qtypes':[[{'text':'1-单选'},{'text':'2-多选'},{'text':'3-判断'}],],
				'qlevels':[[{'text':'1-基础'},{'text':'2-提高'},{'text':'3-疑难'}],],
				'flags':[[{'text':'0-全部'},{'text':'1-已学习'},{'text':'2-未学习'}],],
				'num':'',
			},
			errorType: ['message'],
	        
			forms:{
		         'qtypes':'',
		         'qlevels':'',
		         'flags':'',
				 'bttype':'',
		         'num':0
			},
			rules: {
			    bttype:
			    {
			    	required: true,
			    	message: '请选择业务类型',
			    	trigger: 'change',
			    },
				qtypes:
				{
					required: true,
					message: '请选择题目类型',
					trigger: 'change',
				},
				qlevels:
				{
					required: true,
					message: '请选择题目难度',
					trigger: 'change',
				},
				flags:
				{
					required: true,
					message: '请选择出题类型',
					trigger: 'change',
				},
				num:[
					{
						required: true,
						message: '请选择题目数量',
						trigger: 'change',
					},
					{
						min: 1,
						max: 5,
						message: '题目数量在1到99之间',
						trigger: ['change','blur'],
					}
				]
		
			},
		    formsMap: {
			'qtypes':{'label':'题目类型','prop':'select','type':'select','prop':'select','placeholder':'请选择题目类型','tap':false,'result':"1-单选",'key':'qtypes','value':[{'text':'1-单选'},{'text':'2-多选'},{'text':'3-判断'}]},//下拉列表的数据 题型
			'qlevels':{'label':'题目类型','prop':'select','type':"select",'prop':'select','placeholder':'请选择题目难度','tap':false,'result':"1-单选",'key':'qlevels','value':[{'text':'1-基础'},{'text':'2-提高'},{'text':'3-疑难'}]},//难度
			'flags':{'label':'题目类型','prop':'select','type':"select",'prop':'select','placeholder':'请选择状态类型','tap':false,'result':"1-单选",'key':'flags','value':[{'text':'0-全部'},{'text':'1-已学习'},{'text':'2-未学习'}]},
			'num':{'label':'题目类型','prop':'','type':"number",'placeholder':'请输入题目个数','result':10,'key':'num','value':10},
			},
			userInfo:{},
		};
	},
	async onload(){
	this.userInfo=await this.$util.getUser(this);	
	},
	async onReady() {
		let result =await this.$util.post('OperationSele',{teller_id:this.userInfo._id});
		this.bttype=result;
		this.btypeTrue=result;
		this.listMap['bttype'][0]=result.map(x=>{
			return {'text':x['typename']}
		}); 

		this.$refs.uForm.setRules(this.rules);
	},
	methods:{			
		click(key){
			this.currentType=key;
			this.actionSheetList=this.listMap[key][0];
			this.actionSheetShow=true;
			
		},
		actionSheetCallback(index) {
			uni.hideKeyboard();

			this[this.currentType]=index;
			console.log(this[this.currentType]);
			console.log(this.actionSheetList[index].text);
			console.log(this.forms[this.currentType]);
            this.forms[this.currentType]=this.actionSheetList[index].text;
			console.log(this.forms[this.currentType]);
		},
		async submit(){
			//this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm.validate(async valid =>  {
					console.log(valid);
				if (valid) {
					//if(!forms.model.agreement) return forms.$u.toast('请勾选协议');
					let param={
						qtype:this.qtypes+1,
						// qlevel:this.qlevels+1,
						qlevel:1,//暂时写死
						flag:this.flags,
						btype:this.btypeTrue[this.bttype]['typeid'],
						num:this.forms.num,
						teller_id:this.userInfo._id					
					}
					console.log(param);
					let result=await this.$util.post("judgeExamKnowledge",{teller_id:this.userInfo._id}); 					
					console.log(result);
					if(!result){
						this.$util.toast(this.$refs,"考试进行中，不能使用此功能！",true,'error');
						return;
					}	
					result= await this.$util.post('Studyset',param);
					if(result&&result.length>0){
						console.log("/pages/exam/examtest?question");
						this.$util.questiontest=result;
						this.$u.route('/pages/exam/examtest');
					}else{
						this.$util.toast(this.$refs,"题库为空！",true,'error');
					}
					console.log(result)
				
				} else {
					console.log('验证失败');
				}
			});
			
		}
	}
}
</script>

<style scoped lang="scss">
.wrap {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
}
</style>