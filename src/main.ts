import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/main.scss'

import feather from 'vue-icon'
import VueMask from 'v-mask'
import EventBus from 'vue-bus-ts'
Vue.use(VueMask)
Vue.use(feather, 'v-icon')
Vue.use(EventBus)
Vue.config.productionTip = false

const bus = new EventBus.Bus()

new Vue({
  bus,
  render: h => h(App),
}).$mount('#app')
