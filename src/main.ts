import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './router/guard'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import { createPinia } from 'pinia'
import { i18n } from './locales'
import VueClickAway from 'vue3-click-away'
import lazyPlugin from 'vue3-lazy'
// import { registerSvgIcon } from '@/icons'
import { registerObSkeleton } from '@/components/LoadingSkeleton'
import 'prismjs/themes/prism.css'
import 'prismjs'
import 'element-plus/theme-chalk/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import infiniteScroll from 'vue3-infinite-scroll-better'
import v3ImgPreview from 'v3-img-preview'
import 'mavon-editor/dist/css/index.css'
import api from './api/api'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

import { components, plugins } from './plugins/element-plus'

import 'virtual:svg-icons-register' // 导入图标
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
// 使用 Vite 的 import 语法加载图片资源
import loadingImage from '@/assets/default-cover.jpg'
import errorImage from '@/assets/default-cover.jpg'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
  .use(router)
  .use(i18n)
  .use(VueClickAway)
  .use(infiniteScroll)
  .use(v3ImgPreview, {})
  .use(lazyPlugin, {
    loading: loadingImage,
    error: errorImage
  })

const userStore = useUserStore()
axios.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
  return config
})

const proxy = app.config.globalProperties
axios.interceptors.response.use(
  (response) => {
    if (response.data.flag) {
      return response
    }
    switch (response.data.code) {
      case 50000: {
        proxy.$notify({
          title: 'Error',
          message: '系统异常',
          type: 'error'
        })
        break
      }
      case 40001: {
        proxy.$notify({
          title: 'Error',
          message: '用户未登录',
          type: 'error'
        })
        if (userStore.userInfo !== '') {
          userStore.userInfo = ''
          userStore.token = ''
          userStore.accessArticles = []
          sessionStorage.removeItem('token')
        }
        break
      }
      default: {
        proxy.$notify({
          title: 'Error',
          message: response.data.message,
          type: 'error'
        })
        break
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

components.forEach((component) => {
  app.component(component.name, component)
})
plugins.forEach((plugin) => {
  app.use(plugin)
})

// registerSvgIcon(app)
registerObSkeleton(app)

// 注册全局组件
app.component('svg-icon', SvgIcon)

app.mount('#app')
console.log('%c 网站作者:MissBlue', 'color:#bada55')
console.log('%c qq:290169254', 'color:#bada55')
api.report()
