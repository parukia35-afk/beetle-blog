<template>
  <v-app>
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
        <v-btn icon="mdi-account-outline" />
        <v-btn icon="mdi-clipboard-text-outline" />
        <v-btn icon="mdi-cart-outline" />
      </div>

      <template #extension>
        <div class="w-100 d-flex justify-center">
          <v-btn v-for="item in menuItems" :key="item" :to="item.path" variant="text">
            {{ item.title }}
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-footer border class="bg-grey-lighten-4 text-center d-flex flex-column">
      <div class="mt-4">
        <v-btn
          v-for="icon in footerIcons"
          :key="icon"
          class="mx-4"
          color="primary"
          :icon="icon"
          variant="text"
        />
      </div>

      <div class="pt-4 pb-4 px-4 text-body-2 text-grey-darken-1">
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
  const menuItems = [
    { title: '首頁', path: '/' },
    { title: '甲蟲飼育', path: '/articles' },
    { title: 'BEKUWA 紀錄', path: '/records' },
    { title: '日常蟲事', path: '/daily' },
    { title: '蟲友分享', path: '/share' },
    { title: '商店', path: '/shop' },
    { title: '關於本站', path: '/about' },
  ]
</script>
