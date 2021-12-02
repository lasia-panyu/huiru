<template>
	<view class="wrap">
		    <u-form :model="forms" :rules="rules" ref="uForm" :errorType="errorType" >
			<u-form-item  :label-position="labelPosition" label="编号" prop="id" label-width="150">
			   <u-input :border="border" placeholder="请输入编号" v-model="forms.id" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label-width="150" label="密码" prop="passwd">
				<u-input :password-icon="true" :border="border" type="password" v-model="forms.passwd" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="forms.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
			<u-form-item  label-width="150" :label-position="labelPosition" label="姓名" prop="name">
						<u-input :border="border" placeholder="请输入姓名" v-model="forms.name" type="text"></u-input>
			</u-form-item>
			<u-form-item  label-width="150" :label-position="labelPosition" label="身份证" prop="cre">
						<u-input :border="border" placeholder="请输入身份证号" v-model="forms.cre" type="text"></u-input>
			</u-form-item>	
				<u-form-item  :label-position="labelPosition" label="手机号码" prop="phone" label-width="150">
				   <u-input :border="border" placeholder="请输入手机号" v-model="forms.phone" type="number"></u-input>
				</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择地区" label-width="150" prop="zone">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.zone" placeholder="选择地区" @click="click('zone')"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择机构" label-width="150" prop="branch">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.branch" placeholder="选择机构" @click="click('branch')"></u-input>
			</u-form-item>
			
			 <u-button  type="primary"  @click="submit">提交</u-button>
			</u-form>
			
			<u-toast ref="uToast" />	
			<u-select mode="single-column" :list="actionSheetList" v-model="actionSheetShow" @confirm="confirm"></u-select>
			
	<!-- 		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	 -->
	</view>

</template>

<script>
export default{
	data() {
		return {
			show:false,
			border:false,
			labelPosition: 'left',
			actionSheetList:[],
			actionSheetShow:false,
			currentType:'',	
			listMap:{
				'zone':[],
				'branch':[]
			},
			errorType: ['message'],
	        
			forms:{
                  id:'',
                  name:'',
                  passwd:'',
				  rePassword:'',
                  phone:'',				
				  zone:'',
				  branch:'',
				  cre:'',
			},
			rules: {
				cre:[
				{
					required: true,
					message: '请输入身份证号',
					trigger: 'change',
				},	
				],
				
				id:[
				{
					required: true,
					message: '请输入编号',
					trigger: 'change',
				},
				{
					len:3,
					message: '长度必须为三位',
					trigger: ['change','blur'],
				}
			    ],
				name:{
					required: true,
					message: '请输入姓名',
					trigger: 'change',
				},
				passwd: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['change','blur'],
					},
					{
						min:3,
						message: '长度必须大于三位',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
				rePassword: [
					{
						required: true,
						message: '请重新输入密码',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							return value === this.forms.passwd;
						},
						message: '两次输入的密码不相等',
						trigger: ['change','blur'],
					}
				],
				phone:[
				{
					required: true,
					message: '请输入手机号',
					trigger: 'change',
				},
				{
					len:11,
					message: '手机号必须为十一位',
					trigger: ['change','blur'],
				}
			    ],
			    zone:
			    {
			    	required: true,
			    	message: '请选择地区',
			    	trigger: 'change',
			    },
				branch:
				{
					required: true,
					message: '请选择机构',
					trigger: 'change',
				},
			}			
		};
	},
	onload(){
	
		
	},
	async onReady() {
		let result =await this.$util.post('zonenoInfos',{});
		console.log(result);
		this.zone=result;
		this.listMap.zone[0]=result.map(x=>{
			return {'value':x.zoneNo,'label':x.zoneName}
		})
		// this.bttype=result;
		// console.log(result.map(x=>{return {'text':x['typename']}}));
		// this.listMap['bttype'][0]=result.map(x=>{
		// 	return {'text':x['typename']}
		// });
		// this.$refs.uForm.setRules(this.rules);
	},
	methods:{			
		async click(key){
			console.log(key);
			this.currentType=key;
			this.actionSheetList=this.listMap[key][0];
			this.actionSheetShow=true;
			

		},
		async confirm(e) {
		 	uni.hideKeyboard();
			console.log(e);
			console.log(this.currentType);
			this.forms[this.currentType]=e[0].label;
			this[this.currentType]=e[0];
			if( this.currentType == 'zone'){
				console.log(e[0].value);
				let result=await this.$util.post('brparamInfos',{zoneno:e[0].value});
				console.log(result);
				this.listMap.branch[0]=result.map(x=>{
					return  {'value':x.brno,'label':x.brname}
				})
			}
			
			// console.log(this[this.currentType+'s']);
			// console.log(this.forms[this.currentType]);
		},
		async submit(){
			let that=this;
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm.validate(async valid =>  {
					console.log(valid);
				if (valid) {
					//if(!forms.model.agreement) return forms.$u.toast('请勾选协议');
					let param={
						id:this.zone['value']+this.branch['value'] +this.forms.id,
						name:this.forms.name,
						passwd:this.forms.passwd,
						phone:this.forms.phone,
						role:9,
						status:0,
						id_num:this.forms.cre,
						zoneno:this.zone['value'],
						brno:this.branch['value']                   				
					};
					uni.showModal({
					    title: '注册须知',
					    content: '请检查您的注册信息是否正确,同时用户登录账号为:'+this.zone['value']+this.branch['value'] +this.forms.id,
					    success: async function (res) {							
					        if (res.confirm) {
								let result= await that.$util.post('TellerInsert',param);
								console.log(result)
								console.log(that.zone['value']+that.branch['value'] +that.forms.id)
								if(result){
									that.$util.accountno=that.zone['value']+that.branch['value'] +that.forms.id
									that.$u.route({
										            type:'navigateBack',
													url: '/pages/login/login',
													params: {
														id: that.zone['value']+that.branch['value'] +that.forms.id
													}
												})
								}
								else{
									console.log(that.$util);
									that.$util.toast(that.$refs,"该用户已经注册",true,'error');
									return;
								}
						
					        } else if (res.cancel) {
								
					        }
					    }
					});
				
				
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