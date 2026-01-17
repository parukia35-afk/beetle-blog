/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
// 1. 這裡放所有的「匯入 (Imports)」：必須放在檔案的最上方
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// 2. 這裡放「導出 (Export)」：整個檔案只能有一個 default export
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: '#2E7D32', // 森林綠
          secondary: '#8D6E63', // 木質棕
          accent: '#FFD54F', // 琥珀色
          background: '#F5F5F5',
          surface: '#FFFFFF',
          error: '#C62828',
          info: '#0288D1',
          success: '#43A047',
          warning: '#FB8C00',
        },
      },
    },
  },
})
