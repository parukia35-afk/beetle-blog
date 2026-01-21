<template>
  <v-container class="py-10">
    <div class="text-center mb-15">
      <h1 class="text-h2 font-weight-black mb-4">BEKUWA 飼育紀錄全集</h1>
      <p class="text-subtitle-1 text-grey-darken-1">精確紀錄每一筆世界最強鍬形蟲的巔峰數據</p>
      <v-divider class="mx-auto mt-4" width="100" thickness="3" color="primary"></v-divider>
    </div>

    <v-row v-for="(group, genus) in genusClassification" :key="genus" class="mb-16">
      <v-col cols="12">
        
        <div class="d-flex align-center mb-6">
          <v-icon icon="mdi-bug" color="primary" class="mr-3" size="large"></v-icon>
          <h2 class="text-h4 font-weight-bold">{{ genus }}</h2>
          <v-spacer></v-spacer>
          <v-chip color="primary" variant="tonal" size="small">
            共 {{ group.length }} 筆紀錄
          </v-chip>
        </div>

        <v-card border flat class="rounded-xl overflow-hidden">
          <v-table hover density="comfortable">
            <thead>
              <tr class="bg-grey-lighten-4">
                <th class="text-left font-weight-bold" style="width: 20%;">中文俗名</th>
                <th class="text-left font-weight-bold" style="width: 30%;">學名 / 亞種名</th>
                <th class="text-center font-weight-bold">飼育紀錄</th>
                <th class="text-center font-weight-bold">野生紀錄</th>
                <th class="text-left font-weight-bold">日文名稱</th>
                <th class="text-center font-weight-bold">登錄年</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in group" :key="item._id">
                
                <td class="font-weight-bold text-primary">
                  {{ shouldShowName(group, index) ? item.commonName : '' }}
                </td>

                <td class="font-italic text-grey-darken-3">
                  {{ item.scientificName }}
                </td>

                <td class="text-center">
                  <span class="text-h6 font-weight-bold text-deep-orange-darken-1">
                    {{ item.captiveRecord }}
                  </span>
                  <small class="ml-1 text-grey">mm</small>
                </td>

                <td class="text-center">
                  <span class="font-weight-medium">{{ item.wildRecord || '-' }}</span>
                  <small v-if="item.wildRecord" class="ml-1 text-grey">mm</small>
                </td>

                <td class="text-body-2 text-grey-darken-1">
                  {{ item.japaneseName }}
                </td>

                <td class="text-center text-body-2 font-mono">
                  {{ item.year }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="8">
        <v-card border class="pa-8 rounded-xl" flat color="grey-lighten-5">
          <div class="d-flex align-center mb-6">
            <v-icon icon="mdi-comment-text-multiple-outline" class="mr-2"></v-icon>
            <h3 class="text-h5">發表研究評論</h3>
          </div>
          <v-textarea
            auto-grow
            counter
            label="針對此屬的紀錄發表你的看法..."
            rows="4"
            variant="solo-filled"
            flat
            class="mb-4"
          />
          <div class="d-flex justify-end">
            <v-btn color="black" size="large" prepend-icon="mdi-send" rounded="pill">
              送出評論
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const rawBekuwaRecords = ref([])

// 1. 從後端抓BekuwaRecord資料
async function fetchRecords() {
  try {
    const response = await axios.get('http://localhost:4000/record/')
    rawBekuwaRecords.value = response.data.result
  } catch (error) {
    console.log('資料抓取失敗', error)
  }
}

// 2. 將抓到的原始資料按學名排序後依屬名分到不同的key裡
const genusClassification = computed(() => {
  // genusClassification 是一個依照屬名分類的函式，最終會return出一個有很多key名稱為屬名的物件。
  const sortedBekuwaRecords = [...rawBekuwaRecords.value].sort(
    (
      a,
      b
    ) => a.scientificName.localeCompare(b.scientificName) // 將原始資料按學名排序
  )

  const groupedRecords = {} // 先開一個空物件

  sortedBekuwaRecords.forEach((item) => {
    if (!groupedRecords[item.genus]) {
      groupedRecords[item.genus] = [] // 如果該物件裡沒有跟迴圈到的資料的屬名一樣的key，則創建一個以該屬名為名的key，其值為一空陣列。
      groupedRecords[item.genus].push(item) // 然後將迴圈到的資料放進對應屬名的空陣列裡
    } else {
      groupedRecords[item.genus].push(item)
    }
  })
  return groupedRecords
})

// 判斷是否要顯示中文俗名
function shouldShowName(group, index) {
  if (index === 0) return true
  return group[index].commonName !== group[index - 1].commonName
}

onMounted(fetchRecords)
</script>

<route lang="yaml">
path: /records
meta:
  layout: default
</route>
