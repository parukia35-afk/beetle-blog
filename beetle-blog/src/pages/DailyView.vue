<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      <h1 class="text-h4 font-weight-bold mb-2">日常蟲事</h1>
      <p class="text-grey-darken-1">分享我的飼育日常、感觸與突發奇想</p>
    </div>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card
          v-for="post in dailyPosts"
          :key="post.id"
          border
          class="mb-8 pa-4"
          flat
        >
          <div class="d-flex flex-column flex-sm-row gap-4">
            <v-img
              class="flex-shrink-0"
              cover
              max-height="250"
              rounded="lg"
              :src="post.image"
              width="300"
            />

            <div class="flex-grow-1">
              <div class="d-flex align-center mb-2">
                <v-icon class="mr-2" color="grey" size="small">mdi-clock-outline</v-icon>
                <span class="text-caption text-grey">{{ post.date }}</span>
              </div>

              <div class="text-body-1 text-grey-darken-3 leading-relaxed">
                {{ post.content }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 日常短文假資料
  const dailyPosts = [
    {
      id: 1,
      date: '2024-02-15',
      content: '今天幫婆羅洲寬扁換土，發現三齡幼蟲已經突破 40g 了！這隻的牙型真的讓人期待。希望能在羽化時看到理想的長牙表現。',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800',
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      date: '2024-02-10',
      content: '天氣轉冷，溫控室的溫度要特別注意。甲蟲雖然強壯，但溫度的劇烈波動對化蛹階段的個體影響很大。',
      image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800',
      likes: 8,
      comments: 0,
    },
  ]
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
</style>

<route lang="yaml">
path: /daily
meta:
  layout: default
</route>
