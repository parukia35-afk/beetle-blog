import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import serviceUser from '@/services/user'

export const useUserStore = defineStore('user', () => {
  // 1. State: 存資料
  const token = ref('')
  const account = ref('')
  const role = ref('user')

  // 2. Getters: 計算屬性 (判斷是否登入)
  const isLogin = computed(() => token.value.length > 0)
  const isAdmin = computed(() => role.value === 'admin')

  // 3. Actions: 動作 (與後端溝通)
  
  // 註冊邏輯
  async function register(form) {
    try {
      await serviceUser.register(form)
      return { success: true, message: '註冊成功' }
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || '註冊失敗' }
    }
  }

  // 登入邏輯
  async function login(form) {
    try {
      const { data } = await serviceUser.login(form)
      // 登入成功，把後端回傳的資料存進 State
      token.value = data.result.token
      account.value = data.result.account
      role.value = data.result.role
      return { success: true, message: '登入成功' }
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || '帳號或密碼錯誤' }
    }
  }

  // 登出邏輯 (之後會用到)
  function logout() {
    token.value = ''
    account.value = ''
    role.value = 'user'
  }

  return {
    token,
    account,
    role,
    isLogin,
    isAdmin,
    register,
    login,
    logout
  }
}, {
  // 啟用持久化，這會把資料自動存在 localStorage
  persist: true
})