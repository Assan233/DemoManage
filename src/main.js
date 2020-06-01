import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

import { routes } from "@/routers"
import VueRouter from "vue-router"
const router = new VueRouter({
  mode: 'history',
  routes,
})
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
