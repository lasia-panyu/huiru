<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="content" label="留言内容" required>
				<textarea @input="binddata('content', $event.detail.value)" class="uni-textarea-border"
					:value="formData.content" trim="right"></textarea>
			</uni-forms-item>
			<uni-forms-item name="imgs" label="图片列表">
				<uni-file-picker file-mediatype="image" :limit="6" return-type="array" v-model="formData.imgs" />
			</uni-forms-item>
			<uni-forms-item name="contact" label="联系人">
				<uni-easyinput v-model="formData.contact" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="mobile" label="联系电话">
				<uni-easyinput v-model="formData.mobile" trim="both" />
			</uni-forms-item>

			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/uni-feedback.js';

	const db = uniCloud.database();
	const dbCollectionName = 'opendb-feedback';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		data() {
			return {
				formData: {
					"content": "",
					"imgs": [],
					"contact": "",
					"mobile": ""
				},
				formOptions: {},
				rules: {
					...getValidator(["content", "imgs", "contact", "mobile"])
				}
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
				uni.showLoading({
					mask: true
				})
				console.log(this.formData);
				this.$refs.form.submit().then((res) => {
					this.submitForm(res)
					
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					uni.showModal({
						content: '提交成功，感谢您的反馈！',
						showCancel: false,
						confirmText:"关闭",
						complete:()=>{
							this.getOpenerEventChannel().emit('refreshData')
							setTimeout(() => uni.navigateBack(), 500)
						}
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

<style>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;
	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
		width: 90%;
	}

	.uni-button-group {
		margin-top: 50px;
		display: flex;
		justify-content: center;
		flex-direction: row;
	}

	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}

	.uni-container /deep/ .uni-file-picker__container {
		flex-direction: row;
	}
</style>
