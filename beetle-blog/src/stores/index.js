import { createPinia } from 'pinia'
// 1. 引入持久化外掛
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// 2. 核心動作：安裝外掛
pinia.use(piniaPluginPersistedstate)

export default pinia
