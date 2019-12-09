import Vue from 'vue'
import App from './App.vue'
import Router from './router/'

Vue.config.productionTip = false

new Vue({
  Router,
  components:{APP,Timer},
  render: h => h(App),
}).$mount('#app')
