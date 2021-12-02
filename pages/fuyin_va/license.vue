<template>
	<view class="content">
		<view class="title">新冠疫苗接种提示</view>
		<scroll-view>
			<view style="font-weight: bold;">温馨提示：</view>
			<text>
				1.接种当天，请注意保暖，不要空腹，保持接种局部卫生、防止感染。接种疫苗后注意休息，多饮温开水。
				2.接种后1-2天可能出现发热、局部疼痛、全身乏力等症状，一般1-2天可缓解，无需特殊处理。
				3.若您接种后出现持续发热、高热或其它怀疑与接种相关的身体明显不适，建议及时到就近的医院就诊，同时按照知情同意书上预留的电话向接种单位报告。

				为积极做好新冠疫苗接种相关工作，海淀区各接种单位均设立有接种新冠疫苗热线咨询服务电话，若接种中或接种后出现不良反应，您可拨打接种单位公布的咨询电话进行咨询，将有医务人员第一时间对您的情况进行了解，并根据具体情况告知您如何应对。
				\n
			</text>
			<view style="font-weight: bold;">接种人员基本条件和注意事项</view>
			<text>
				本次接种对象的年龄范围暂定为接种当日年龄在18岁以上，在上臂三角肌肌肉注射。
				\n
			</text>
			<view style="font-weight: bold;">
				注意以下9类人群不在本次接种范围：
			</view>
			<text>
				1.年龄＜18岁。
				2.孕妇、哺乳期妇女。
				3.发热。
				4.既往发生过疫苗接种严重过敏反应（如急性过敏反应、荨麻疹、皮肤湿疹、呼吸困难、血管神经性水肿或腹痛）。
				5.患有血小板减少症或者出血性疾病者。
				6.惊厥、癫痫、脑病、其他进行性神经系统疾病和精神疾病史或家族史。
				7.严重的肝肾疾病、药物不可控制的高血压（收缩压≥140mmHg,舒张压≥90mmHg)、糖尿病并发症、恶性肿瘤；各种急性疾病或慢性疾病急性发作期。
				8.已被诊断为患有先天性或获得性免疫缺陷、HIV感染、淋巴瘤、白血病或其他自身免疫系统疾病。
				9.已知或怀疑患有以下疾病：严重呼吸系统疾病、严重心血管疾病等。
				\n
			</text>
		</scroll-view>
		<view>
			<label>
				<checkbox :checked="agree" @click="changeagree" />我已了解告知书和注意事项
			</label>
			<text>\n\n</text>
		</view>
		<view>
			<button style="color: white;" type="primary" size="mini" :disabled="!agree" @click="gotoadd"> 下一步 </button>
			<text>\n</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"agree": false
			}
		},
		methods: {
			changeagree: function() {
				this.agree = !this.agree
			},
			gotoadd: function() {
				uni.navigateTo({
					url:"../fuyin_va/add"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
		margin-right: 10px;
	}

	text {
		color: #8f8f94;
		font-size: 14px;
	}

	.title {
		font-size: 20px;
		text-align: center;
		color: #000000;
		margin: 10px;
	}
</style>
