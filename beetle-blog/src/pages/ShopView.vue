<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" md="3">
        <v-card border class="pa-4 rounded-lg" flat>
          <div class="text-subtitle-1 font-weight-bold mb-4">商品分類</div>
          <v-list density="compact" nav v-model:selected="selectedCategory">
            <v-list-item
              v-for="item in filterItems"
              :key="item"
              :value="item"
              color="primary"
              rounded="lg"
              :title="item"
              @click="category = item"
              :active="category === item"
            />
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row v-if="loading">
          <v-col v-for="n in 6" :key="n" cols="12" md="4" sm="6">
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>

        <v-row v-else-if="filteredProducts.length > 0">
          <v-col v-for="product in filteredProducts" :key="product._id" cols="12" md="4" sm="6">
            <v-card border class="h-100 d-flex flex-column rounded-lg" flat hover>
              <v-img
                cover
                height="200"
                :src="product.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
              >
                <template #placeholder>
                  <v-row align="center" class="fill-height ma-0" justify="center">
                    <v-progress-circular color="grey-lighten-4" indeterminate />
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
                  @click="addToCart(product)"
                >
                  加入購物車
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else align="center" justify="center" class="py-16">
          <v-col class="text-center">
            <v-icon icon="mdi-package-variant" size="64" color="grey-lighten-1" />
            <div class="text-grey mt-4">此分類目前沒有商品上架</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import serviceProduct from '@/services/product'

// --- 狀態定義 ---
const products = ref([])
const loading = ref(true)
const category = ref('所有商品')

// 注意：這裡的名稱要對應你資料庫 enum 的定義
const filterItems = ['所有商品', '成蟲', '幼蟲', '耗材 | 工具', '其他']

// --- 資料獲取 ---
const fetchProducts = async () => {
  loading.value = true
  try {
    const { data } = await serviceProduct.fetchProducts()
    products.value = data.result
  } catch (error) {
    console.error('抓取商品失敗:', error)
  }
  loading.value = false
}

// --- 篩選邏輯 ---
const filteredProducts = computed(() => {
  if (category.value === '所有商品') return products.value
  return products.value.filter((p) => p.category === category.value)
})

// --- 動作 ---
const addToCart = (product) => {
  alert(`已將 ${product.name} 加入購物車！ (串接功能開發中)`)
}

onMounted(fetchProducts)
</script>

<route lang="yaml">
path: /shop
meta:
  layout: default
</route>
