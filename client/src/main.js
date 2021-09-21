import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import messages from './locale/i18n';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.config.lang = 'en';

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
i18n.locale = 'en';
