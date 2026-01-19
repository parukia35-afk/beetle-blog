<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" md="3">
        <v-card border class="pa-4" flat>
          <div class="text-subtitle-1 font-weight-bold mb-4">篩選條件</div>
          <v-list density="compact" nav>
            <v-list-item
              v-for="item in filterItems"
              :key="item"
              color="primary"
              rounded="lg"
              :title="item"
              :value="item"
            />
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card border class="h-100 d-flex flex-column" flat hover>
              <v-img
                cover
                height="200"
                :src="product.image"
              >
                <template #placeholder>
                  <v-row align="center" class="fill-height ma-0" justify="center">
                    <v-progress-circular color="grey-lighten-5" indeterminate />
                  </v-row>
                </template>
              </v-img>

              <v-card-item>
                <v-card-title class="text-body-1 font-weight-bold">{{ product.name }}</v-card-title>
                <v-card-subtitle class="text-primary font-weight-bold">
                  NT$ {{ product.price }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-text class="text-caption text-grey-darken-1 flex-grow-1">
                {{ product.description }}
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  prepend-icon="mdi-cart-plus"
                  variant="flat"
                >
                  加入購物車
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const filterItems = ['所有商品', '幼蟲/成蟲', '飼育耗材', '活體週邊']

  // 模擬 Product 資料表中的資料
  const products = [
    {
      id: 1,
      name: '長戟大兜蟲 D.h.h (L3 幼蟲)',
      price: 350,
      description: '健康的 L3 幼蟲，目前穩定進食中，是嘗試巨型兜蟲的最佳選擇。',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400',
    },
    {
      id: 2,
      name: '特級發酵木屑 (5L)',
      price: 150,
      description: '專為大兜蟲調配的腐植質，細度均勻，有利於幼蟲成長。',
      image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=400',
    },
    {
      id: 3,
      name: '寬扁形蟲成蟲一對',
      price: 800,
      description: '牙型壯碩，展現婆羅洲寬扁形蟲獨特的暴力魅力。',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400',
    },
  ]
</script>

<route lang="yaml">
path: /shop
meta:
  layout: default
</route>
