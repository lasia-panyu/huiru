<template>
	<view class="wrap" style="min-height: 100vh; padding: 20px;">
		<u-navbar title="直播设置">
			<view slot="right" style="padding: 7px 7px 7px 12px;" @click="launchPusher">
				<u-icon label="创建直播房间" size="40" name="play-circle-fill" :color="activeColor"></u-icon>
			</view>
		</u-navbar>
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="房间名称" required>
				<u-input v-model="form.live_Name" placeholder="信贷业务培训" clearable />
			</u-form-item>
		<!-- 	<u-form-item label="推流地址" required>
				<u-input v-model="form.push_url" placeholder="地址格式: rtmp://" clearable />
			</u-form-item> -->
			<u-form-item label="视频画质" required></u-form-item>
			<u-subsection :list="mode_select" :current="getCurrent('mode_select', 'mode')" :active-color="activeColor" @change="modeChange"></u-subsection>

			<u-form-item label="视频方向" required></u-form-item>
			<u-subsection :list="orientation_select" :current="getCurrent('orientation_select', 'orientation')" :active-color="activeColor"
			 @change="orientationChange"></u-subsection>

			<u-form-item label="摄像方向" required></u-form-item>
			<u-subsection :list="devicePosition_select" :current="getCurrent('devicePosition_select', 'devicePosition')"
			 :active-color="activeColor" @change="devicePositionChange"></u-subsection>

			<u-form-item label="支持对焦" required>
				<u-switch slot="right" v-model="form.autoFocus" :active-color="activeColor"></u-switch>
			</u-form-item>

			<u-form-item label="远近焦距" required>
				<u-switch slot="right" v-model="form.zoom" :active-color="activeColor"></u-switch>
			</u-form-item>

			<u-form-item label="美颜级别" required>
				<view>{{form.beauty}} 级</view>
			</u-form-item>
			<u-slider v-model="form.beauty" min="0" max="100" step="10" block-width="50" :active-color="activeColor"></u-slider>

			<u-form-item label="美颜级别" required>
				<view>{{form.whiteness}} 级</view>
			</u-form-item>
			<u-slider v-model="form.whiteness" min="0" max="100" step="10" block-width="50" :active-color="activeColor"></u-slider>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeColor: "#2979ff",
				mode_select: [{
						value: 'SD',
						name: '标清'
					},
					{
						value: 'HD',
						name: '高清'
					},
					{
						value: 'FHD',
						name: '超清'
					}
				],
				orientation_select: [{
						value: 'vertical',
						name: '垂直方向'
					},
					{
						value: 'horizontal',
						name: '水平方向'
					}
				],
				devicePosition_select: [{
						value: 'front',
						name: '前置摄像'
					},
					{
						value: 'back',
						name: '后置摄像'
					}
				],
				witch_select: [{
						value: true,
						name: '开启'
					},
					{
						value: false,
						name: '关闭'
					}
				],
				form: {
					live_Name: '', //房间名称
					push_url: 'rtmp://fuyin.fuxinbank.com:1935/myapp/'+this.$util.account.id, // 推流地址
					mode: 'FHD', // 视频模式
					autoFocus: true, // 自动对焦
					zoom: true, // 远近焦距
					beauty: 30, // 美颜级别 0-100
					whiteness: 30, // 美白级别 0-100
					orientation: 'vertical', // 画面方向
					devicePosition: 'front' // 摄像方向
				}
			}
		},
		computed: {
			// 获取当前选项列表下标
			getCurrent() {
				return (select_name, form_name) => {
					let select_object = this[select_name]
					let active_value = this['form'][form_name]
					if (select_object && active_value) {
						for (let i in this[select_name]) {
							if (select_object[i]['value'] == active_value) {
								return i
							}
						}
						return 0
					}
				}
			}
		},
		methods: {
			modeChange(index) {
				let value = this.mode_select[index]['value']
				if (value)
					this.$set(this.form, 'mode', value)
			},
			orientationChange(index) {
				let value = this.orientation_select[index]['value']
				if (value)
					this.$set(this.form, 'orientation', value)
			},
			devicePositionChange(index) {
				let value = this.devicePosition_select[index]['value']
				if (value)
					this.$set(this.form, 'devicePosition', value)
			},
			launchPusher() {
				let query = '?'
				let params = this.form
				for (let key in params) {
					query += `${key}=${params[key]}&`
				}
				query = query.replace(/&$/, '')
				console.log(query)
				
				let teller_id = this.$util.account.id
				let live_Name = this.form.live_Name
				
				console.log(live_Name)
				uni.request({
									method:'POST',
									
								    url: 'https://fuyin.fuxinbank.com:10058/PanguService/liveMessageIns', //数据接口。
									
									// dataType:'json',
								    data: {
										live_HomeNum: teller_id, //this.$util.account.id,
										live_Name: live_Name,
										live_Teacher: teller_id
									},
								    header: {
										'content-type':'application/x-www-form-urlencoded'
								        
								    },
								    success:function (res) {
	
									
								    },
									fail: (e) => {
										console.log(e)
									}
								
								}); 
				
				uni.navigateTo({
					url: './push_weex' + query
				})
				
				
		}
			
			
			
		}
	}
</script>

<style>

</style>
