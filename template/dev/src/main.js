import Vue from 'vue';

import axios from 'axios';

import VueAxios from 'vue-axios';

import Typograf from 'typograf';
import router from './router';
import App from './App.vue';

import '@/assets/scss/app.scss';
import store from './store';

Vue.use(VueAxios, axios);

const Tp = new Typograf({ locale: ['ru', 'en-US'] });

Vue.directive('typograph', {
  bind: (el) => {
    if (process.browser) {
      const element = el;
      element.innerHTML = Tp.execute(el.innerHTML);
    }
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
