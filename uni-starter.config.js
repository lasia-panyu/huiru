//这是应用的配置页面，App.vue挂载到getApp().globalData.config
module.exports = {
	"h5": {
		"url": "https://uni-starter.dcloud.net.cn/", //	前端网页托管的域名
		 // 在h5端全局悬浮引导用户下载app的功能 更多自定义要求在/common/openApp.js中修改
		"openApp": {
			//点击悬浮下载栏后打开的网页链接
			"openUrl": '/#/pages/ucenter/invite/invite',
			//左侧显示的应用名称
			"appname": '福音',
			//应用的图标
			"logo": './static/logo.png',
		}
	},
	"mp": {
		"weixin": {
			//微信小程序原始id，微信小程序分享时
			"id": "gh_33446d7f7a26"
		}
	},
	"router": {
		//needLogin:配置强制需要登陆的页面，在打开这些页面之前会自动检查（前端校验）uni_id_token的值是否有效,如果无效会自动跳转到登陆页面
		"needLogin": [
			// "/pages/ucenter/userinfo/userinfo",
			// "/uni_modules/uni-news-favorite/pages/uni-news-favorite/list",
			// "/uni_modules/uni-feedback/pages/uni-feedback/add"
		],
		/*
		login:配置登陆类型与优先级
			未列举到的，或设备环境不支持的选项，将被隐藏。如果你需要在不同平台有不同的配置，直接用条件编译即可
			根据数组的第0项，决定登录方式的第一优先级。
		*/
		// "login": ["username","smsCode","univerify", "weixin", "apple"],
		"login": ["weixin","smsCode","univerify", "username", "apple"],
	},
	//关于应用
	"about": {
		//应用名称
		"appName": "福音",
		//应用logo
		"logo": "/static/221.png",
		//公司名称
		"company": "阜新银行信息科技部",
		//口号
		"slogan": "信息科技部出品的首个app应用。",
		//政策协议
		"agreements": [{
				"title": "用户服务协议", //协议名称
				"url": "https://static-3b197c47-f4d8-455c-b037-4e5e50a58297.bspapp.com/#/pages/login/loginapp?id=614012844132790001c01e15" //对应的网络链接
			},
			{
				"title": "隐私政策",
				"url": "https://static-3b197c47-f4d8-455c-b037-4e5e50a58297.bspapp.com/#/pages/login/loginapp?id=614012c29ee65f000148c1e2"
			}
		],
		//应用的链接，用于分享到第三方平台和生成关于我们页的二维码
		"download": "https://www.fuxinbank.com/index",
		//version
		"version":"1.0.0" //用于非app端显示，app端自动获取
	},
	"download":{ //用于生成二合一下载页面
		"ios":"https://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8",
		"android":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3b197c47-f4d8-455c-b037-4e5e50a58297/d10c1393-3e3e-496b-a6ca-cc464c8385a8.apk"
	},
	//用于打开应用市场评分界面
	"marketId":{
		"ios":"id1417078253",
		"android":"123456"
	}
}
