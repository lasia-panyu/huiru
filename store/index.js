import Vue from 'vue'
import Vuex from 'vuex'

const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  modules[moduleName]['namespaced'] = true;
  return modules
}, {})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  strict: true
})

export default store