<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card border flat class="rounded-lg">
          <!--------------------------------- 標題 --------------------------------->
          <v-card-title class="d-flex align-center py-4 px-6">
            <v-icon icon="mdi-database-edit" color="primary" class="mr-2" />
            <span class="text-h5 font-weight-black">Bekuwa 紀錄管理</span>
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="搜尋任何關鍵字"
              variant="outlined"
              hide-details
              density="compact"
              class="mr-4"
              style="max-width: 300px"
            />
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog(null)">
              新增紀錄
            </v-btn>
          </v-card-title>

          <v-divider />
<!--------------------------------- 表格內容區 --------------------------------->
          <v-data-table
            :headers="headers"
            :items="records"
            :search="search"
            :loading="loading"
            hover
            class="record-table"
          >
            <template #[`item.captiveRecord`]="{ item }">
              <span class="font-weight-bold text-deep-orange">{{ item.captiveRecord?.toFixed(1) || '-' }}</span>
            </template>
            <template #[`item.wildRecord`]="{ item }">
              <span>{{ item.wildRecord?.toFixed(1) || '-' }}</span>
            </template>

            <template #[`item.actions`]="{ item }">
              <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="openDialog(item)" />
              <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="deleteItem(item)" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
<!--------------------------------- 彈窗 --------------------------------->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card class="rounded-xl">
        <v-card-title class="pa-6 font-weight-bold text-h5">
          {{ editedId ? '編輯 Bekuwa 紀錄' : '新增 Bekuwa 紀錄' }}
        </v-card-title>
        
        <v-card-text class="pa-6 pt-0">
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.genus" label="屬名 (Genus)" variant="outlined" :rules="[v => !!v || '必填']" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.commonName" label="中文俗名" variant="outlined" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.scientificName" label="學名 (Scientific Name)" variant="outlined" :rules="[v => !!v || '必填']" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="form.captiveRecord" label="飼育紀錄 (mm)" type="number" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="form.wildRecord" label="野生紀錄 (mm)" type="number" variant="outlined" />
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field v-model="form.japaneseName" label="日文名稱" variant="outlined" :rules="[v => !!v || '必填']" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="form.year" label="登錄年份" type="number" variant="outlined" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">取消</v-btn>
          <v-btn color="primary" variant="flat" :loading="submitting" @click="submit">
            {{ editedId ? '更新資料' : '確認新增' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import serviceRecord from '@/services/record'

// 狀態管理
const loading = ref(false)
const submitting = ref(false)
const dialog = ref(false)
const search = ref('')
const records = ref([])
const editedId = ref(null)
const formRef = ref(null)

// 表格標題設定
const headers = [
  { title: '屬名', key: 'genus', sortable: true },
  { title: '中文俗名', key: 'commonName', sortable: true },
  { title: '學名', key: 'scientificName', sortable: true },
  { title: '飼育 (mm)', key: 'captiveRecord', align: 'center' },
  { title: '野生 (mm)', key: 'wildRecord', align: 'center' },
  { title: '日文名', key: 'japaneseName' },
  { title: '年份', key: 'year', align: 'center' },
  { title: '操作', key: 'actions', sortable: false, align: 'center' },
]

// 表單初始值
const initialForm = {
  genus: '',
  commonName: '',
  scientificName: '',
  captiveRecord: 0,
  wildRecord: 0,
  japaneseName: '',
  year: new Date().getFullYear()
}
const form = reactive({ ...initialForm })

// 1. 取得資料
const fetchRecords = async () => {
  loading.value = true
  try {
    const { data } = await serviceRecord.fetchRecords()
    records.value = data.result
  } catch (error) {
    alert('資料抓取失敗')
  }
  loading.value = false
}

// 2. 開啟彈窗 (新增/編輯)
const openDialog = (item) => {
  if (item) {
    editedId.value = item._id
    Object.assign(form, item) // 把資料填入表單
  } else {
    editedId.value = null
    Object.assign(form, initialForm) // 重置表單
  }
  dialog.value = true
}

// 3. 提交 (Create / Update)
const submit = async () => {
  console.log('當前提交的資料內容：', JSON.parse(JSON.stringify(form)))
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true // submitting 與新增或更新確認的按鈕的 loading 綁定，避免按下去時資料還在傳輸像是當機而造成使用者狂按，送出好幾筆重複資料。當 loading 為true時，按鈕會轉圈圈且不能按。
  try {
    if (editedId.value) {
      await serviceRecord.updateRecord(editedId.value,form)
    } else {
      await serviceRecord.createRecord(form)
    }
    fetchRecords()
    dialog.value = false
  } catch (error) {
    alert(error.response?.data?.message || '操作失敗')
  }
  submitting.value = false
}

// 4. 刪除
const deleteItem = async (item) => {
  if (confirm(`確定要刪除 ${item.commonName || item.scientificName} 的紀錄嗎？`)) {
    try {
      await serviceRecord.deleteRecord(item._id)
      fetchRecords()
    } catch (error) {
      alert('刪除失敗')
    }
  }
}

onMounted(fetchRecords)
</script>

<route lang="yaml">
meta:
  layout: adminLayout
  login: true
  admin: true
</route>