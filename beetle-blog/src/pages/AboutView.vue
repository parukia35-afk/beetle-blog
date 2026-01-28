<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col class="text-center" cols="12" md="8">
        <h1 class="text-h3 font-weight-bold mb-6">關於 蟲生・蟲森</h1>
        <v-divider class="mb-8" />
      </v-col>
    </v-row>

    <v-row align="center" class="mb-12" justify="center">
      <v-col class="text-center" cols="12" md="4">
        <v-img
          src="../assets/about_me.jpg"
          width="200"
          height="200"
          class="mx-auto mb-4"
          rounded="lg"
          cover
        ></v-img>
        <h2 class="text-h5 font-weight-bold">小帕路</h2>
        <p class="text-subtitle-1 text-grey">甲蟲飼育愛好者</p>
      </v-col>
      <v-col cols="12" md="6">
        <v-card border class="pa-6 bg-grey-lighten-5" flat rounded="lg">
          <h3 class="text-h6 font-weight-bold mb-3">作者簡介</h3>
          <p class="text-body-1 mb-4">
            不只是甲蟲，我喜歡昆蟲與大自然。
            <br />
            在這片小小的森林中，於2021年5月開始，或許我養的不是很好，但秉持分享與記錄的精神，希望能在養蟲之路上留下一些東西。
            <br />
            <br />
            最喜歡的鍬是孔夫子鋸，兜是美西白兜。但還有好多喜歡的鍬。
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" flat rounded="lg">
              <v-icon class="mb-3" color="primary" size="48">mdi-book-open-variant</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">留紀錄供自己查詢</h4>
              <p class="text-body-2 text-grey-darken-1">
                記錄過往飼育數據，作為調整未來飼養策略的重要依據。
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" flat rounded="lg">
              <v-icon class="mb-3" color="primary" size="48">mdi-heart-outline</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">留下回憶</h4>
              <p class="text-body-2 text-grey-darken-1">
                為熱愛的事物留下痕跡，等年老時可以細細緬懷這段回憶。
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" flat rounded="lg">
              <v-icon class="mb-3" color="primary" size="48">mdi-share-variant</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">分享與討論</h4>
              <p class="text-body-2 text-grey-darken-1">
                提供準確的參考資訊，讓更多同好能參與討論並分享經驗。
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
path: /about
meta:
  layout: default
</route>
