<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-h4 font-weight-bold mb-4">管理員控制台</h1>
      <p class="text-grey-darken-1">歡迎回來，{{ user.account }}。請從左側選單選擇要管理的項目。</p>
    </v-col>

    <v-col cols="12" md="4">
      <v-card subtitle="目前紀錄總數" title="528 筆" color="primary" variant="tonal"></v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()
</script>

<route lang="yaml">
meta:
  layout: adminLayout
  login: true
  admin: true
</route>
