import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMask from 'v-mask';
import "@/assets/js/filtros.js";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueMask);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
