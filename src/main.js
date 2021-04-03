import Vue from 'vue';
import AOS from 'aos';
import Lightbox from 'vue-easy-lightbox';
import App from './App.vue';
import 'aos/dist/aos.css';

Vue.use(Lightbox);
AOS.init();
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
