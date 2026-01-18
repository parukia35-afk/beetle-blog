<template>
  <v-container>
    <v-carousel cycle height="500" hide-delimiter-background show-arrows="hover">
      <v-carousel-item v-for="(slide, i) in slides" :key="i" cover :src="slide.src">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2" style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)">
            {{ slide.text }}
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
    <h2 class="text-h4 font-weight-bold my-8 text-left">最新文章</h2>

    <v-row>
      <v-col v-for="article in latestArticles" :key="article.id" cols="12" md="4" sm="6">
        <v-card class="mx-auto" hover max-width="400">
          <v-img cover height="200px" :src="article.image" />

          <v-card-title class="font-weight-bold">
            {{ article.title }}
          </v-card-title>

          <v-card-text class="text-body-2 text-grey-darken-1">
            {{ article.excerpt }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" variant="text">閱讀更多</v-btn>
            <v-spacer />
            <v-btn icon="mdi-heart-outline" variant="text" />
            <v-btn icon="mdi-share-variant-outline" variant="text" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const slides = [
  {
    src: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=2000', // 示意圖：森林感
    text: '探索甲蟲的奧秘'
  },
  {
    src: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000', // 示意圖：微距感
    text: 'BEKUWA 世界紀錄區'
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000', // 示意圖：自然環境
    text: '我的飼育日常'
  }
]

const latestArticles = [
  {
    id: 1,
    title: '【飼育心得】長戟大兜蟲三齡幼蟲管理',
    excerpt: '對於 D.h.h 來說，三齡末期的水分控制與食材營養是決定成蟲體型關鍵...',
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800'
  },
  {
    id: 2,
    title: '2024 BEKUWA 世界紀錄大賽速報',
    excerpt: '今年的紀錄再度突破極限，讓我們來看看哪些物種又刷新了長度極限...',
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800'
  },
  {
    id: 3,
    title: '入門必讀：如何布置你的第一間產房',
    excerpt: '選對產卵木與發酵細土，能讓你事半功倍，這篇文章教你最簡單的配置法...',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800'
  }
]
</script>
