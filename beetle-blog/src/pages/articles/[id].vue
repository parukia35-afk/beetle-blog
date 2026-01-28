<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 font-weight-bold mb-4">{{ article.title }}</h1>

        <div class="mb-6">
          <v-chip color="primary" class="mr-2">{{ article.category }}</v-chip>
          <v-chip color="secondary" variant="outlined" class="mr-2">{{
            article.isCompleted
          }}</v-chip>
          <v-chip v-for="s in article.aboutSpecies" :key="s" class="mr-1" size="small">
            # {{ s }}
          </v-chip>
        </div>

        <v-divider class="mb-8"></v-divider>

        <div class="article-content" v-html="article.content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import serviceArticle from '@/services/article'

const route = useRoute()
const article = ref({})

onMounted(async () => {
  try {
    // 根據網址上的 ID 去跟後端要這篇文章的完整資料
    const { data } = await serviceArticle.getByArticleId(route.params.id)
    article.value = data.result
  } catch (error) {
    console.error('抓取文章失敗')
  }
})
</script>

<style scoped>
/* 這裡可以針對文章內容做基礎美化 */
.article-content :deep(h2) {
  color: #2e7d32;
  margin-top: 24px;
  margin-bottom: 16px;
  border-left: 5px solid #2e7d32;
  padding-left: 12px;
}
.article-content :deep(p) {
  line-height: 1.8;
  margin-bottom: 16px;
}
</style>
