import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import request from '@/utils/request'
import '@/components/imgPreview'

Vue.use(ElementUI, { locale })

Vue.prototype.$fetch = request
Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$delete = request.delete
Vue.prototype.$put = request.put

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
