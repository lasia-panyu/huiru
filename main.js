import Vue from 'vue'
import App from './App'
import store from './store/index.js';
import openApp from './common/openApp.js';
import uView from "uview-ui";


Vue.config.productionTip = false

Vue.use(uView);


openApp();
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})


import util from '@/common/util.js'
Vue.prototype.$util = util//赋值到vue里面

app.$mount()
