<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">
			<uni-forms-item name="username" required>
				<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入用户名" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入用户昵称" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入6-20位密码" type="password" v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="pwd2" v-model="formData.pwd2" required>
				<uni-easyinput :inputBorder="false" class="easyinput" placeholder="再次输入密码" type="password" v-model="formData.pwd2" trim="both" />
			</uni-forms-item>
			<uni-agreements @setAgree="agree = $event"></uni-agreements>
			<button class="send-btn" type="primary" @click="submit">注册并登录</button>
		</uni-forms>
	</view>
</template>

<script>
import rules from './validator.js';
import mixin from '../common/login-page.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				formData: {
					"username": "",
					"nickname": "",
					'password':'',
					'pwd2':''
				},
				rules,
				agree:false
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				if(!this.agree){
					return uni.showToast({
						title: '你未同意隐私政策协议',
						icon: 'none'
					});
				}
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			submitForm(params) {
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'register',
						params,
					},
					success: ({result}) => {
						console.log(result);
						if(result.code === 0){
							this.loginSuccess(result)
						}else{
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");
	.uni-container {
		padding: 15px;
	}
	.send-btn{
		margin-top: 5px;
	}
</style>
