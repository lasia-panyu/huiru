import Vue from 'vue';
import App from './App';
import axios from 'axios'
import store from './store/index.js';
import openApp from './common/openApp.js';

Vue.config.productionTip = false;

App.mpType = 'app';

// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';

// VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
	// 默认语言
	locale: 'zh',
	// 引入语言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
});

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n;
openApp();
const app = new Vue({
	i18n,
	store,
	...App
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
// import httpInterceptor from '@/common/http.interceptor.js';
// Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
// import httpApi from '@/common/http.api.js';
// Vue.use(httpApi, app);


// create an axios instance
// const service = axios.create({
//     baseURL: 'https://hlm.fuxinbank.com:10061/PanguService/', 
//     withCredentials: false, // send cookies when cross-domain requests
//     // timeout: 5000, // request timeout
//     crossDomain: true
// });
// axios.defaults.adapter = function(config) {
//     return new Promise((resolve, reject) => {
//         console.log(config)
//         var settle = require('axios/lib/core/settle');
//         var buildURL = require('axios/lib/helpers/buildURL');
//         uni.request({
//             method: config.method.toUpperCase(),
//             url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
//             header: config.headers,
//             data: config.data,
//             dataType: config.dataType,
//             responseType: config.responseType,
//             sslVerify: config.sslVerify,
//             complete: function complete(response) {
//                 response = {
//                     data: response.data,
//                     status: response.statusCode,
//                     errMsg: response.errMsg,
//                     header: response.header,
//                     config: config
//                 };

//                 settle(resolve, reject, response);
//             }
//         })
//     })
// };
// Vue.prototype.$axios = service;


import util from '@/common/util.js'
Vue.prototype.$util = util//赋值到vue里面
// import menupage from'@/components/index/menu.vue'
// import advert from'@/components/index/advert.vue'
// Vue.component('menu-page',menupage)
// Vue.component('advert-page',advert)
app.$mount();


