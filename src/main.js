import Vue from 'vue';
import App from './App.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lightbox from 'vue-easy-lightbox';

Vue.use(Lightbox);
AOS.init();
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
