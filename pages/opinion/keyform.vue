<template>
	<view >
			<u-form :model="forms" :rules="formsrules" ref="uForm" :errorType="errorType" v-if="flag">

				<u-form-item :label-position="labelPosition" label-width="150" label="关键词" prop="name">
					<u-input :border="border" placeholder="关键词" v-model="forms.name" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="抓取渠道" prop="payType" label-width="150">
				<u-radio-group v-model="radiot" @change="radioGroupChanget" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in forms.checkboxList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="是否抓取" prop="payType" label-width="150">
				<u-radio-group v-model="radioc" @change="radioGroupChangec" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in forms.t1rueList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="是否推送" prop="payType" label-width="150">
				<u-radio-group v-model="radiop" @change="radioGroupChangep" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in forms.t2rueList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
				</u-form-item>
				<u-toast ref="uToast" />
				<u-button type="primary" @click="submit">提交</u-button>
			</u-form>
	</view>
</template>


<script>
    export default {
        data() {
            return {
				item:'',
				radioc:'',
				radiop:'',
				radiot:'',
				border: false,
				labelPosition: 'left',
				flag:true,
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				errorType: ['message'],
                forms:{
					 name:'',
					 checkboxList: [
					 	{
					 		name: '百度',
					 		checked: false,
					 		disabled: false
					 	},
					 	{
					 		name: '新浪微博',
					 		checked: false,
					 		disabled: false
					 	},
					 	{
					 		name: '头条',
					 		checked: false,
					 		disabled: false
					 	},
					 	{
					 		name: '贴吧',
					 		checked: false,
					 		disabled: false
					 	}
					 ],
					 t1rueList: [
					 	{
					 		name: '是',
					 		checked: false,
					 		disabled: false
					 	},
					 	{
					 		name: '否',
					 		checked: false,
					 		disabled: false,
							disabled: false
					 	}
					 ],
					 t2rueList: [
					 	{
					 		name: '是',
					 		checked: false,
					 		disabled: false
					 	},
					 	{
					 		name: '否',
					 		checked: false,
					 		disabled: false,
					 	}
					 ],
                },
				formsrules: {},
            }
        },
        onLoad(item) {
			console.log(item);
			this.item=item;
			this.forms.name=item.categroyKeyword;
			this.radiot=item.categroyType;
			this.radioc=item.categroyFlag=='1'?'是':'否';
			this.radiop=item.categroyPushflag=='1'?'是':'否';
			this.flag=false;
			this.flag=true;
			
        },
		onReady(){
            uni.setNavigationBarTitle({
                title:this.title
            })
        },
		methods:{
			// radio选择发生变化
			radioGroupChanget(e) {
				this.radiot=e;
			},
			radioGroupChangec(e) {
				this.radioc=e;
			},
			radioGroupChangep(e) {
				this.radiop=e;
			},
			async submit(){
			    let result=await this.$util.upost('updateKey',{
					categroyId:this.item.categroyId,
					categroyKeyword:this.forms.name,
					categroyType:this.radiot,
					categroyName:this.item.categroyName,
					categroyFlag:this.radioc=='是'?1:0,
					categroyPushflag:this.radiop=='是'?1:0,
				});
				console.log(result);
				if(result){
					this.$util.toast(this.$refs,"修改成功！",true,'success');
					this.$u.route({type:'navigateBack',url:'/pages/opinion/category',param:this.item})
				}

			}
		}
    }
</script>

<style>
</style>
