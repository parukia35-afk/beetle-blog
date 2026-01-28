<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="mb-4">文章發布實驗室 🧪</h1>
        <v-form @submit.prevent="submit">
          <v-text-field v-model="form.title" label="文章標題" variant="outlined" />

          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.category"
                :items="['飼育紀錄', '翻譯文章']"
                label="文章屬性"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-radio-group v-model="form.isCompleted" inline label="進度">
                <v-radio label="連載中" value="連載中" />
                <v-radio label="已完成" value="已完成" />
              </v-radio-group>
            </v-col>
          </v-row>

          <v-combobox
            v-model="form.aboutSpecies"
            label="物種分類 (打完按 Enter)"
            multiple
            chips
            variant="outlined"
          />

          <label class="d-block mb-2">文章內容</label>
          <TiptapEditor v-model="form.content" />

          <v-btn color="success" size="large" type="submit" block class="mt-4">
            發布文章並存入資料庫
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'
import serviceArticle from '@/services/article'
import TiptapEditor from '@/components/TiptapEditor.vue'

const form = reactive({
  title: '',
  content: '',
  category: '飼育紀錄',
  isCompleted: '連載中',
  aboutSpecies: []
})

const submit = async () => {
  try {
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('content', form.content) // 這裡就是傳送那一堆 HTML 碼
    fd.append('category', form.category)
    fd.append('isCompleted', form.isCompleted)

    // 正確傳送陣列標籤
    form.aboutSpecies.forEach((s) => fd.append('aboutSpecies', s))

    await serviceArticle.createArticle(fd)
    alert('存入成功！快去 MongoDB 查看 content 欄位吧！')
  } catch (error) {
    console.error(error)
    alert('失敗：' + (error.response?.data?.message || '伺服器錯誤'))
  }
}
</script>

<route lang="yaml">
meta:
  layout: adminLayout
</route>
