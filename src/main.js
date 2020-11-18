import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 开启性能模式
Vue.config.performance = true
const isDev = process.env.NODE_ENV !== "production"
console.log('isDev:', isDev)

new Vue({
  render: h => h(App),
}).$mount('#app')
