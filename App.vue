<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import initApp from '@/common/appInit.js';
	import checkIsAgree from '@/uni_modules/uni-agree/utils/uni-agree.js';
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config:{}
		},
		onLaunch: function() {
			console.log('App Launch')
			initApp()
			// #ifdef APP-PLUS
			//checkIsAgree(); APP端暂时先用原生默认生成的。目前，自定义方式启动vue界面时，原生层已经请求了部分权限这并不符合国家的法规
			// #endif
			
			// #ifdef H5
				// checkIsAgree(); 默认不开启。目前全球，仅欧盟国家有网页端同意隐私权限的需要。如果需要
			// #endif

			// #ifdef APP-PLUS
			//idfa有需要的用户在应用首次启动时自己获取存储到storage中
			//https://ask.dcloud.net.cn/article/36107
			/*if(~plus.storage.getItem('idfa')){
				plus.device.getInfo({//需要勾选IDFA
					success:function(e){  
						console.log('idfa =  '+JSON.stringify(e.idfa));  
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));  
					}  
				});
			}*/
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import '@/common/uni.css';
	@import '@/common/uni-icons.css';
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_3mrhac2o3oi.ttf') format('truetype');
	}
	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-huifu:before {
	  content: "\e68b";
	}
	
	.icon-comment:before {
	  content: "\e64f";
	}
	
	.icon-dianzan-ash:before {
	  content: "\e617";
	}
	
	.icon-iconfontshanchu1:before {
		content: "\e619";
	}
	
	.icon-iconfontweixin:before {
		content: "\e611";
	}
	
	.icon-shang:before {
		content: "\e624";
	}
	
	.icon-shouye:before {
		content: "\e626";
	}
	
	.icon-shanchu4:before {
		content: "\e622";
	}
	
	.icon-xiaoxi:before {
		content: "\e618";
	}
	
	.icon-jiantour-copy:before {
		content: "\e600";
	}
	
	.icon-fenxiang2:before {
		content: "\e61e";
	}
	
	.icon-pingjia:before {
		content: "\e67b";
	}
	
	.icon-daifukuan:before {
		content: "\e68f";
	}
	
	.icon-pinglun-copy:before {
		content: "\e612";
	}
	
	.icon-shoucang:before {
		content: "\e645";
	}
	
	.icon-xuanzhong2:before {
		content: "\e62f";
	}
	
	.icon-icon-test:before {
		content: "\e60c";
	}
	
	.icon-bianji:before {
		content: "\e646";
	}
	
	.icon-zuoshang:before {
		content: "\e613";
	}
	
	.icon-jia2:before {
		content: "\e60a";
	}
	
	.icon-sousuo:before {
		content: "\e7ce";
	}
	
	.icon-arrow-fine-up:before {
		content: "\e601";
	}
	
	.icon-hot:before {
		content: "\e60e";
	}
	
	.icon-lishijilu:before {
		content: "\e6b9";
	}
	
	.icon-xiatubiao--copy:before {
		content: "\e608";
	}
	
	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}
	
	.icon-jia1:before {
		content: "\e61c";
	}
	
	.icon-bangzhu1:before {
		content: "\e63d";
	}
	
	.icon-arrow-left-bottom:before {
		content: "\e602";
	}
	
	.icon-arrow-right-bottom:before {
		content: "\e603";
	}
	
	.icon-arrow-left-top:before {
		content: "\e604";
	}
	
	.icon-icon--:before {
		content: "\e744";
	}
	
	.icon-zuojiantou-up:before {
		content: "\e605";
	}
	
	.icon-xia:before {
		content: "\e62d";
	}
	
	.icon--jianhao:before {
		content: "\e60b";
	}
	
	.icon-Group-:before {
		content: "\e688";
	}
	
	.icon-you:before {
		content: "\e606";
	}
	
	.icon-forward:before {
		content: "\e607";
	}
	
	.icon-tuijian:before {
		content: "\e610";
	}
	
	.icon-bangzhu:before {
		content: "\e679";
	}
	
	.icon-share:before {
		content: "\e656";
	}
	
	.icon-shezhi1:before {
		content: "\e61d";
	}
	
	.icon-fork:before {
		content: "\e61b";
	}
	
	.icon-iLinkapp-:before {
		content: "\e654";
	}
	
	.icon-saomiao:before {
		content: "\e60d";
	}
	
	.icon-shezhi:before {
		content: "\e60f";
	}
	
	.icon-shouhoutuikuan:before {
		content: "\e631";
	}
	
	.icon-gouwuche:before {
		content: "\e609";
	}
	
	.icon-dizhi:before {
		content: "\e614";
	}
	
	.icon-xingxing:before {
		content: "\e70b";
	}
	
	.icon-zuanshi:before {
		content: "\e615";
	}
	
	.icon-zuo:before {
		content: "\e63c";
	}
	
	.icon-shoucang2:before {
		content: "\e62e";
	}
	
	.icon-yishouhuo:before {
		content: "\e71a";
	}
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	
	
</style>