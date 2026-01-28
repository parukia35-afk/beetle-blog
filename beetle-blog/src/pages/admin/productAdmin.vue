<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card border flat class="rounded-lg">
          <v-card-title class="d-flex align-center py-4 px-6">
            <v-icon icon="mdi-shopping" color="primary" class="mr-2" />
            <span class="text-h5 font-weight-black">商品管理</span>
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="搜尋商品名稱"
              variant="outlined"
              hide-details
              density="compact"
              class="mr-4"
              style="max-width: 300px"
            />
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog(null)">
              新增商品
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-data-table
            :headers="headers"
            :items="products"
            :search="search"
            :loading="loading"
            hover
            class="product-table"
          >
            <template #[`item.image`]="{ item }">
              <v-img
                :src="item.imageUrl || 'https://placehold.co/100x100?text=No+Image'"
                width="60"
                height="60"
                cover
                class="rounded-lg my-2 border"
              />
            </template>

            <template #[`item.price`]="{ item }">
              <span class="font-weight-bold text-primary">${{ item.price }}</span>
            </template>

            <template #[`item.sell`]="{ item }">
              <v-chip :color="item.sell ? 'success' : 'grey'" size="small">
                {{ item.sell ? '上架中' : '未上架' }}
              </v-chip>
            </template>

            <template #[`item.actions`]="{ item }">
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="blue"
                size="small"
                @click="openDialog(item)"
              />
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="red"
                size="small"
                @click="deleteItem(item)"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="700px" persistent>
      <v-card class="rounded-xl">
        <v-card-title class="pa-6 font-weight-bold text-h5">
          {{ editedId ? '編輯商品資訊' : '新增商品' }}
        </v-card-title>

        <v-card-text class="pa-6 pt-0">
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" class="d-flex flex-column align-center" v-if="form.imageUrl">
                <div class="text-caption mb-2 text-grey">當前商品圖片：</div>
                <v-img
                  :src="form.imageUrl"
                  max-height="200"
                  width="200"
                  aspect-ratio="1"
                  class="rounded-lg border mb-4"
                  cover
                />
              </v-col>

              <v-col cols="12" md="8">
                <v-text-field
                  v-model="form.name"
                  label="商品名稱"
                  variant="outlined"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.category"
                  :items="categories"
                  label="分類"
                  variant="outlined"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="form.price"
                  label="價格"
                  type="number"
                  prefix="$"
                  variant="outlined"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="form.sell"
                  label="上架狀態"
                  color="success"
                  hide-details
                  inset
                  class="mt-2"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.description"
                  label="商品描述"
                  variant="outlined"
                  rows="3"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="form.image"
                  :label="editedId ? '更換商品圖片 (不更換請留空)' : '上傳商品圖片'"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  show-size
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">取消</v-btn>
          <v-btn color="primary" variant="flat" :loading="submitting" @click="submit">
            確認儲存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import serviceProduct from '@/services/product'

// --- 狀態管理 ---
const loading = ref(false)
const submitting = ref(false)
const dialog = ref(false)
const search = ref('')
const products = ref([])
const editedId = ref(null)
const formRef = ref(null)

// --- 設定檔 ---
const headers = [
  { title: '圖片', key: 'image', sortable: false },
  { title: '商品名稱', key: 'name', sortable: true },
  { title: '分類', key: 'category' },
  { title: '價格', key: 'price', align: 'center' },
  { title: '狀態', key: 'sell', align: 'center' },
  { title: '操作', key: 'actions', align: 'end', sortable: false }
]

const categories = ['成蟲', '幼蟲', '耗材 | 工具', '其他']

const rules = {
  required: (v) => !!v || '此欄位必填'
}

const initialForm = {
  name: '',
  price: 0,
  description: '',
  category: '成蟲',
  sell: false,
  image: null,
  imageUrl: '' // 用於顯示雲端網址的預覽
}

const form = reactive({ ...initialForm })

// --- 函式邏輯 ---

// 1. 取得商品清單
const fetchProducts = async () => {
  loading.value = true
  try {
    const { data } = await serviceProduct.fetchProducts()
    products.value = data.result
  } catch (error) {
    alert('商品載入失敗')
  }
  loading.value = false
}

// 2. 開啟彈窗
const openDialog = (item) => {
  if (item) {
    editedId.value = item._id
    Object.assign(form, item) // 同步所有欄位(包含 imageUrl)
    form.image = null // 檔案輸入框重置為空
  } else {
    editedId.value = null
    Object.assign(form, initialForm) // 重置為初始狀態
  }
  dialog.value = true
}

// 3. 提交資料 (新增/更新)
const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true

  // 使用 FormData 包裝包含檔案的資料
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('price', form.price)
  fd.append('description', form.description)
  fd.append('category', form.category)
  fd.append('sell', form.sell)
  if (form.image) {
    // 如果是陣列就取第一個，不是陣列就直接用
    const file = Array.isArray(form.image) ? form.image[0] : form.image
    fd.append('image', file)
    console.log('確認有把檔案塞進 FormData:', file)
  }

  try {
    if (editedId.value) {
      await serviceProduct.updateProduct(editedId.value, fd)
    } else {
      await serviceProduct.createProduct(fd)
    }
    await fetchProducts() // 重新拉取最新資料
    dialog.value = false
  } catch (error) {
    alert(error.response?.data?.message || '儲存失敗')
  }
  submitting.value = false
}

// 4. 刪除商品
const deleteItem = async (item) => {
  if (confirm(`確定要刪除商品 ${item.name} 嗎？`)) {
    try {
      await serviceProduct.deleteProduct(item._id)
      await fetchProducts()
    } catch (error) {
      alert('刪除失敗')
    }
  }
}

onMounted(fetchProducts)
</script>

<route lang="yaml">
meta:
  layout: adminLayout
  login: true
  admin: true
</route>
