<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" md="2">
        <v-card border class="pa-4" flat>
          <div class="text-subtitle-1 font-weight-bold mb-4">篩選條件</div>
          <v-list density="compact" nav>
            <v-list-item
              v-for="cat in categories"
              :key="cat"
              color="primary"
              rounded="lg"
              :title="cat"
              :value="cat"
            />
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="10">
        <v-text-field
          class="mb-6"
          hide-details
          label="搜尋文章..."
          prepend-inner-icon="mdi-magnify"
          rounded="lg"
          variant="outlined"
        />

        <v-row>
          <v-col v-for="article in articles" :key="article.id" cols="12">
            <v-card border class="pa-0 overflow-hidden" flat hover>
              <div class="d-flex flex-column flex-sm-row">
                <v-img
                  class="flex-shrink-0"
                  cover
                  height="180"
                  :src="article.image"
                  width="250"
                />

                <div class="pa-4 d-flex flex-column justify-center">
                  <div class="text-overline mb-1 text-primary">{{ article.category }}</div>
                  <h3 class="text-h6 font-weight-bold mb-2">{{ article.title }}</h3>
                  <p class="text-body-2 text-grey-darken-1 mb-4">
                    {{ article.excerpt }}
                  </p>
                  <div class="d-flex align-center text-caption text-grey">
                    <v-icon class="mr-1" size="small">mdi-calendar-range</v-icon>
                    {{ article.date }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const categories = ['所有文章', '飼育心得', '日常蟲事', 'BEKUWA 紀錄', '活動速報']

  const articles = [
    {
      id: 1,
      category: '飼育心得',
      title: '婆羅洲寬扁&信之巨扁-飼育紀錄(連載中)',
      excerpt: '對於寬扁形蟲，有種說不出來的魔力... 我已經暗自決定要把這三種寬扁飼育起來了。',
      date: '2024-02-01',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800',
    },
    {
      id: 2,
      category: '日常蟲事',
      title: '新竹尖石鄉宇老採集紀實',
      excerpt: '這座森林裡分布著來自世界各地繽紛奪目、千奇百怪的超酷甲蟲...',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800',
    },
  ]
</script>

<route lang="yaml">
path: /articles
meta:
  layout: default
</route>
