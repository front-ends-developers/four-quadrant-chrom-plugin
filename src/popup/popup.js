import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';

import '../css/base.css';
import '../css/pop.css';
import '../css/fonts/iconfont.css';
import '../css/fonts/iconfont.js';
global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
browser.browserAction.setBadgeText({text: 'New'});
browser.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});

browser.notifications.create(null, {
	type: 'image',
	iconUrl: '../../images/notify256.png',
	title: '温馨提醒',
	message: '骚年，工作快乐！',
	imageUrl: '../../images/notify256.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
