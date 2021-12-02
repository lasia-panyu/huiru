<template>
	<view class="wrap">
		    <u-form :model="forms" :rules="rules" ref="uForm" :errorType="errorType" >
			<u-form-item  :label-position="labelPosition" label="柜员号" prop="id" label-width="170">
			   <u-input :border="border" placeholder="请输入柜员号" v-model="forms.id" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label-width="170" label="密码" prop="passwd">
				<u-input :password-icon="true" :border="border" type="password" v-model="forms.passwd" placeholder="请输入密码"></u-input>
			</u-form-item>
		<!-- 	<u-form-item :label-position="labelPosition" label-width="170" label="再次输入密码" prop="passwd1">
				<u-input :password-icon="true" :border="border" type="password" v-model="forms.passwd1" placeholder="请再次输入密码"></u-input>
			</u-form-item> -->
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="forms.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
			<u-form-item  label-width="170" :label-position="labelPosition" label="姓名" prop="name">
						<u-input :border="border" placeholder="请输入姓名" v-model="forms.name" type="text"></u-input>
			</u-form-item>
			<u-form-item  label-width="170" :label-position="labelPosition" label="身份证" prop="id_num">
						<u-input :border="border" placeholder="请输入身份证号" v-model="forms.id_num" type="text"></u-input>
			</u-form-item>	
				<u-form-item  :label-position="labelPosition" label="手机号码" prop="phone" label-width="170">
				   <u-input :border="border" placeholder="请输入手机号" v-model="forms.phone" type="number"></u-input>
			</u-form-item>
			
			</u-form-item>
				<u-form-item  :label-position="labelPosition" label="验证码" prop="yzm" label-width="170">
				   <u-input :border="border" placeholder="请输入验证码" v-model="forms.yzm" type="number"></u-input>
				   <u-button size="mini" shape="circle" type="primary" @click="getcode()" v-if="authCode">获取验证码</u-button>
				   <u-button :plain="true" size="mini" shape="circle" v-if="!authCode"  type="primary">{{ authTime }}S后重新获取</u-button>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="所属分行" label-width="170" prop="zone">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.zone" placeholder="选择分行" @click="click('zone')"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="选择机构" label-width="170" prop="branch">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="forms.branch" placeholder="选择机构" @click="click('branch')"></u-input>
			</u-form-item>
			<!-- czq  20210511 -->
			<u-form-item :label-position="labelPosition" label="是否为党员" label-width="170" prop="dy">
				<checkbox @click="checkChange" :checked="isChecked"></checkbox>
			</u-form-item>
			<!-- czq -->
			<block v-if="isChecked">
			<u-form-item :label-position="labelPosition" label="党员类别" label-width="170" prop="dyjg" >
				<u-input v-model="forms.dyjg" type="select" :border="border" @click="show = true" />
				<u-action-sheet :list="listdyjg" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			</u-form-item>
			</block>
			
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
			value:'',
			border:false,
			labelPosition: 'left',
			actionSheetList:[],
			actionSheetShow:false,
			currentType:'',	
			// 倒计时计数器
			authTime: 0,
			// 重新发送
			btnShow: true,
			// 显示‘获取按钮’还是‘倒计时’
			authCode: true,
			listdyjg:[
					{
						text: '分行班子'
					},
					{
						text: '中层'
					},
					{
						text: '普通党员'
					}
				],
			listMap:{
				'zone':[],
				'branch':[]
			},
			errorType: ['message'],
			// czq 20210511
	        isChecked: false,
			//czq 
			forms:{
                  id:'',
                  name:'',
                  passwd:'',
                  phone:'',				
				  zone:'',
				  branch:'',
				  id_num:'',
				  dy:'',
				  dyjg:'',
				  yzm:'',
				  passwd1:""
			},
			rules: {
				id_num:[
				{
					required: true,
					message: '请输入身份证号',
					trigger: 'change',
				},	
				],
				
				id:[
				{
					required: true,
					message: '请输入柜员号',
					trigger: 'change',
				},
				{
					len:6,
					message: '长度必须为六位',
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
				dyjg:
				{
					required: true,
					message: '请选择党员类别',
					trigger: 'change',
				},
				yzm:
				{
					required: true,
					message: '请输入短信验证码',
					trigger: 'change',
				},
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
			}		
		};
	},
	onLoad(){
	
		
		// this.forms.name=this.$util.account.name;
	},
	async onReady() {
		console.log(111111111111111111111)
		console.log(this.$util)
		console.log(this.$util.account);
		for(let key in this.$util.account){
			console.log(this.forms[key])
			if(this.forms[key]!=undefined){
				console.log(this.forms[key])
				this.forms[key]=this.$util.account[key]
			}
		}
		this.forms.zone=this.$util.account.zoneno_name;
		this.zone={'value':this.$util.accountno,'label':this.$util.account.zoneno_name};
		let result =await this.$util.post('zonenoInfos',{});
		this.listMap.zone[0]=result.map(x=>{
			return {'value':x.zoneNo,'label':x.zoneName}
		})
		console.log(result);
		this.zone=result;
		this.forms.branch=this.$util.account.dept;
		this.branch={'value':"",'label':this.$util.account.dept};
		this.isChecked=this.party?true:false;
		this.dyjg=this.party;

		// this.listMap.zone[0]=result.map(x=>{
		// 	return {'value':x.zoneNo,'label':x.zoneName}
		// })
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
		// czq 20210511
		checkChange(e) {
			this.isChecked = !this.isChecked,
			console.log(this.isChecked)
			this.showdyjg = 'true';
		},
		//czq
		actionSheetCallback(index) {
						this.forms.dyjg = this.listdyjg[index].text;
					},
					// 验证码
		async getcode() {
					    let _this = this;
						if (!_this.forms.phone) {
							uni.showToast({
								icon: 'none',
								title: '请输入手机号'
							})
							return false;
						}
						if (!_this.forms.id) {
							uni.showToast({
								icon: 'none',
								title: '请输柜员号'
							})
							return false;
						}
					    _this.authTime = 10;
					    _this.authCode = false;
					
					let param={
						
						phone: this.forms.phone,
						teller_id: this.forms.id,
						
					};
					let result= await this.$util.post('smsVerify',param);
					    console.log('调用验证码接口');
					console.log(result)
					    // 倒计时计数器
					    var sendTimer = setInterval(() => {
					        _this.authTime--;
					        if (_this.authTime <= 0) {
					            _this.authCode = true;
					            clearInterval(sendTimer);
					        }
					    }, 1000);
					},
					
					
		async submit(){
			let that=this;
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm.validate(async valid =>  {
					console.log(valid);
					
				if (valid) {
					//if(!forms.model.agreement) return forms.$u.toast('请勾选协议');
					let param={
						//czq 注销  id:this.zone['value']+this.branch['value'] +this.forms.id,
						id: this.forms.id,
						name: this.forms.name,
						passwd: this.forms.passwd,
						phone: this.forms.phone,
						role: 9,
						status: 0,
						id_num: this.forms.id_num,
						zoneno: this.zone['value'],
						brno: this.branch['value'],
						//czq 20210511
						party: this.forms.dyjg,
						verifyCode: this.forms.yzm
						//czq 
						
					};
					uni.showModal({
					    title: '注册须知',
					    // czq --注销 20210511 content: '请检查您的注册信息是否正确,同时用户登录账号为:'+this.zone['value']+this.branch['value'] +this.forms.id,
						content: '请检查您的注册信息是否正确,同时用户登录账号为:'+this.forms.id,
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
														//czq 注销 id: that.zone['value']+that.branch['value'] +that.forms.id
														id: that.forms.id
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