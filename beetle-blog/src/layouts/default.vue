<template>
  <v-app>
    <!-------------------------------- 導航列 -------------------------------->
    <v-app-bar border color="white" flat height="120">
      <div class="ml-4">
        <v-img src="@/assets/logo.png" width="70" />
      </div>

      <v-spacer />
      <div class="text-center">
        <div class="text-h4 font-weight-bold">蟲生.蟲森</div>
        <div class="text-caption">Nature loves diversity.</div>
      </div>

      <v-spacer />
      <div class="mr-4">
  <v-btn v-if="!user.isLogin" icon="mdi-account-outline" @click="openDialog" />

  <v-menu v-else>
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="text" class="text-h6 font-weight-bold">
        <v-icon start icon="mdi-account-check" color="success"></v-icon>
        {{ user.account }}
      </v-btn>
    </template>
    
    <v-list class="rounded-lg">
      <v-list-item prepend-icon="mdi-cog-outline" title="帳號設定" to="/settings" />
      <v-divider />
      <v-list-item 
        prepend-icon="mdi-logout" 
        title="登出" 
        color="error" 
        @click="logout" 
      />
    </v-list>
  </v-menu>

  <v-btn icon="mdi-clipboard-text-outline" />
  <v-btn icon="mdi-cart-outline" />
  <v-btn 
  v-if="user.isLogin && user.isAdmin" 
  to="/admin" 
  variant="tonal" 
  color="secondary" 
  class="ml-2"
>
  管理後台
</v-btn>
</div>
    <!-------------------------------- 主選單 -------------------------------->

      <template #extension>
        <div class="w-100 d-flex justify-center">
          <v-btn v-for="item in menuItems" :key="item.title" :to="item.path" variant="text">
            {{ item.title }}
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-------------------------------- 內容區 -------------------------------->
    <v-main>
      <router-view />
    </v-main>
    <!-------------------------------- 註冊登入彈窗 -------------------------------->
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="rounded-xl pa-4">
        <v-card-title class="text-h5 font-weight-black text-center">
          {{ isRegister ? '加入蟲友' : '歡迎回來' }}
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="form.account"
              label="帳號"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="密碼"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              class="mt-4 rounded-lg font-weight-bold"
              elevation="0"
            >
              {{ isRegister ? '立即註冊' : '登入系統' }}
            </v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn variant="text" size="small" @click="isRegister = !isRegister">
            {{ isRegister ? '已有帳號？點此登入' : '還沒帳號？點此註冊' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-------------------------------- 頁尾 -------------------------------->
    <v-footer border class="bg-grey-lighten-4 text-center d-flex flex-column">
      <div class="pt-8 pb-4 px-4 text-body-2 text-grey-darken-1">
        這裡是你的甲蟲飼育與生活記錄。從長戟大兜到 BEKUWA
        世界紀錄，我們記錄每一份對自然的熱愛與堅持。
      </div>

      <v-divider class="w-100" />

      <div class="py-4 text-caption text-grey">
        {{ new Date().getFullYear() }} — <strong>Beetle Blog | 甲蟲飼育誌</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {useUserStore} from '@/stores/user'

const user = useUserStore()

const menuItems = [
  { title: '首頁', path: '/' },
  { title: '甲蟲飼育', path: '/articles' },
  { title: 'BEKUWA 紀錄', path: '/records' },
  { title: '日常蟲事', path: '/daily' },
  { title: '蟲友分享', path: '/share' },
  { title: '商店', path: '/shop' },
  { title: '關於本站', path: '/about' }
]

const dialog = ref(false)
const isRegister = ref(false)

const form = reactive({
  account: '',
  password: ''
})

const openDialog = () => {
  form.account = ''
  form.password = ''
  dialog.value = true
  isRegister.value = false
}

const submit = async () => {
  let result
  if (isRegister.value) {
    result = await user.register(form)
  } else {
    result = await user.login(form)
  }

  if (result.success) {
    alert(result.message)
    dialog.value = false
  } else {
    alert(result.message)
  }
}

const logout = () => {
  user.logout()
  alert('已成功登出')
}
</script>