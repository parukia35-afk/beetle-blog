<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent border="none" color="grey-lighten-4">
      <div class="pa-4 text-center">
        <v-avatar size="64" color="primary" class="mb-2">
          <v-icon icon="mdi-account-star" size="36" color="white" />
        </v-avatar>
        <div class="text-h6 font-weight-bold">{{ user.account }}</div>
        <v-chip size="small" color="primary" variant="flat" class="mt-1">管理員</v-chip>
      </div>

      <v-divider class="mx-4 mb-2"></v-divider>

      <v-list nav>
        <v-list-item
          v-for="item in adminMenuItems"
          :key="item.title"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          active-color="primary"
          rounded="lg"
        />
      </v-list>

      <template #append>
        <div class="pa-4">
          <v-btn block prepend-icon="mdi-home" variant="text" to="/"> 回首頁 </v-btn>
          <v-btn
            block
            prepend-icon="mdi-logout"
            color="error"
            variant="tonal"
            class="mt-2"
            @click="logout"
          >
            登出
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat border="bottom">
      <v-app-bar-title class="font-weight-black text-h5">
        後台管理系統 <span class="text-caption text-grey ml-2">Beetle Blog Control Panel</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const drawer = ref(true)

const adminMenuItems = [
  { title: '管理主頁', icon: 'mdi-view-dashboard', path: '/admin' },
  { title: '甲蟲紀錄管理', icon: 'mdi-book-open-variant', path: '/admin/recordAdmin' },
  { title: '商品管理', icon: 'mdi-shopping', path: '/admin/productAdmin' },
  { title: '文章發佈', icon: 'mdi-pencil-box-multiple', path: '/admin/articleAdmin' }
]

const logout = async () => {
  await user.logout()
  alert('管理員已登出')
  router.push('/')
}
</script>
