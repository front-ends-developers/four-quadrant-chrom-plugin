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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
