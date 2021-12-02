<template>
		<view>
		  <video id= "myVideo" src= "https://fuyin.fuxinbank.com:10008/record/1619747658610252.mp4"
		:direction="0"
		:autoplay="true"
		:controls="false"
		:show-play-btn="false"
		:show-center-play-btn="false"
		:enable-progress-gesture="false"
		:style="{ height: windowHeight + 'px' ,width:windowWidth + 'px'}"
		objectFit="fill"
		direction='0'		
		
		@click="goIndex">
		  </video>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				windowWidth: 0,
				videourl: ''
			}
		},
		onLoad() {
			// if (this.$util.accountno!=''){
			// 	this.tel=this.$util.accountno;
			// };
			//this.content=plus.runtime.appid+ plus.runtime.version+ plus.runtime.getProperty(plus.runtime.appid);
			// // #ifdef APP-PLUS
			// callCheckVersion().then(async (e) => {
			// 	console.log(e);
			// 	if (!e.result) return;
			// 	const {
			// 		code,
			// 		message,
			// 		is_silently, // 是否静默更新
			// 		url, // 安装包下载地址
			// 		platform, // 安装包平台
			// 		type // 安装包类型
			// 	} = e.result;
			    
			// 	// 此处逻辑仅为实例，可自行编写
			// 	if (code > 0) {
			// 		// 腾讯云和阿里云下载链接不同，需要处理一下，阿里云会原样返回
			// 		const {
			// 			fileList
			// 		} = await uniCloud.getTempFileURL({
			// 			fileList: [url]
			// 		});
			// 		e.result.url = fileList[0].tempFileURL
			
			// 		// 静默更新，只有wgt有
			// 		if (is_silently) {
			// 			uni.downloadFile({
			// 				url: e.result.url,
			// 				success: res => {
			// 					if (res.statusCode == 200) {
			// 						// 下载好直接安装，下次启动生效
			// 						plus.runtime.install(res.tempFilePath, {
			// 							force: false
			// 						});
			// 					}
			// 				}
			// 			});
			// 			return;
			// 		}
			
					/**
					 * 提示升级一
					 * 使用 uni.showModal
					 */
					// return updateUseModal(e.result)
			
					/**
					 * 提示升级二
					 * 官方适配的升级弹窗，可自行替换资源适配UI风格
					 */
			// 		uni.setStorageSync(PACKAGE_INFO_KEY, e.result)
			// 		uni.navigateTo({
			// 			url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
			// 			fail: (err) => {1
			// 				console.error('更新弹框跳转失败', err)
			// 				uni.removeStorageSync(PACKAGE_INFO_KEY)
			// 			}
			// 		})
			// 	} else if (code < 0) {
			// 		// TODO 云函数报错处理
			// 		console.error(message)
			// 	}
			// }).catch(err => {
			// 	// TODO 云函数报错处理
			// 	console.error(err.message)
			// })
			//#endif
		},
		mounted: function (res) {
			var that = this;
			uni.getSystemInfo({
			    success: function (res) {
					console.log(res)
					that.windowHeight = res.windowHeight;
					that.windowWidth = res.windowWidth;
			    }
			});
		},
		methods: {
			videoErrorCallback: function(e) {
				console.log(e)
			},
			goIndex (){
				
				uni.navigateTo ({
					url:'../../pages/login/login'
				});
				console.log("aaaa")
			}
		}
		
	}
	
	
</script>
<style>
</style>