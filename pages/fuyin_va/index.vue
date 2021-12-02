<template>
	<view class="content">
		<view class="title">关于接种新冠疫苗的告知书</view>
		<scroll-view>
			<text> 
				新型冠状病毒（简称“新冠病毒”）肺炎是一种由新冠病毒感染引起，经呼吸道飞沫和密切接触传播为主要传播途径，人群普遍易感的新发传染病。常见的临床表现有发热、乏力、干咳等，少数患者伴有鼻塞、流涕、咽痛、肌痛和腹泻等症状。根据当前新冠病毒肺炎防控需要，依据《疫苗管理法》有关规定，结合已有的临床研究数据，按照国家相关要求，开展新型冠状病毒灭活疫苗（简称“新冠疫苗”）接种，预防新冠病毒感染引起的疾病。本次疫苗接种本着免费，自愿原则，新冠疫苗属于灭活疫苗，每1次人用剂量为0.5ml，共接种2剂，两剂间隔28天，接种对象为18岁以上新冠病毒易感者。
				
				接种新冠疫苗是我国防疫工作的一项重要举措。通过统一组织实施全民免费接种，符合条件的群众都能实现“应接尽接”，从而有效提升受种者对新冠病毒免疫力，降低被感染的风险，构建起免疫屏障，阻断新冠病毒的传播。接种疫苗后可以在“北京健康宝”“健康服务预约查询”界面显示个人疫苗接种状况（接种剂数、接种时间等）。

				如您自愿参与免费接种，现场接种时，务必携带本人有效身份证件，否则将无法顺利接种。现场请听从工作人员指挥，正确佩戴口罩，保持一米线，打喷嚏或咳嗽时要用纸巾等进行遮挡。请您如实提供自身健康状况，接种后现场留观30分钟，观察自身症状和体征，如有不适及时与现场医务人员联系。
			</text>
		</scroll-view>
		<view >
			<navigator url="license">
			<button style="color: white;" type="primary" size="mini"> 下一步 </button>
			</navigator>
			<text>\n</text>
		</view>
	</view>
</template>
<!-- 感谢支持，您已经成功在本地区摸排登记成功！ -->
<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

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
