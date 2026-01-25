/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { setupLayouts } from 'virtual:generated-layouts'
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes' // 引用自動路由，由官方推薦的 unplugin-vue-router 插件而來。自動掃描 pages資料夾內的檔案，產生路徑物件清單，存成變數 routes。
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes) // 將路徑物件清單(變數routes)的所有分頁自動嵌套進指定的 Layout 中
})

// src/router/index.js 裡的 beforeEach
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // 1. 如果去的地方需要登入，但沒登入 -> 回首頁
  if (to.meta.login && !user.isLogin) {
    next('/')
  }
  // 2. 如果去的地方需要管理員，但不是管理員 -> 回首頁
  else if (to.meta.admin && !user.isAdmin) {
    next('/')
  }
  // 3. 其他情況 -> 放行
  else {
    next()
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
