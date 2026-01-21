<template>
  <v-container
    :class="{ 'px-2': $vuetify.display.xs, 'px-10': $vuetify.display.md }"
    style="max-width: 1200px"
    class="pb-15 mt-md-16 mt-8"
  >
    <v-row class="mb-8 mb-md-12">
      <v-col class="text-center">
        <h1
          :class="$vuetify.display.xs ? 'text-h4' : 'text-h2'"
          class="font-weight-black"
          style="letter-spacing: 2px"
        >
          世界鍬形蟲最大紀錄2026

        </h1>
        <v-divider class="mx-auto mt-4" width="60" thickness="4" color="primary"></v-divider>
      </v-col>
    </v-row>

    <div v-for="(group, genus) in genusClassification" :key="genus" class="mb-10 mb-md-16">
      <v-sheet
        color="grey-darken-3"
        theme="dark"
        :class="$vuetify.display.xs ? 'pa-3' : 'pa-5'"
        class="rounded-t-xl d-flex align-center"
      >
        <v-icon
          icon="mdi-bug"
          color="primary"
          :class="$vuetify.display.xs ? 'mr-2' : 'mr-4'"
          :size="$vuetify.display.xs ? '24' : '36'"
        ></v-icon>
        <h2 :class="$vuetify.display.xs ? 'text-h6' : 'text-h4'" class="font-weight-bold">
          {{ genus }}
        </h2>
        <v-spacer></v-spacer>
        <v-chip
          color="primary"
          variant="elevated"
          class="font-weight-black"
          :size="$vuetify.display.xs ? 'small' : 'large'"
        >
          <v-icon start icon="mdi-database-outline" class="d-none d-sm-inline-flex"></v-icon>
          {{ group.length }} 筆
        </v-chip>
      </v-sheet>

      <v-card border flat class="rounded-b-xl overflow-hidden">
        <v-table hover :density="$vuetify.display.xs ? 'compact' : 'comfortable'">
          <thead>
            <tr class="bg-grey-lighten-4">
              <th class="font-weight-bold">中文俗名</th>
              <th class="font-weight-bold">學名</th>
              <th class="text-center font-weight-bold">飼育</th>
              <th class="text-center font-weight-bold d-none d-sm-table-cell">野生</th>
              <th class="text-left font-weight-bold d-none d-md-table-cell">日文名稱</th>
              <th class="text-center font-weight-bold d-none d-sm-table-cell">登錄年</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in group" :key="item._id">
              <td
                :class="$vuetify.display.xs ? 'text-body-1' : 'text-h6'"
                class="font-weight-bold text-primary"
              >
                {{ shouldShowName(group, index) ? item.commonName : '' }}
              </td>

              <td class="font-italic text-grey-darken-2 text-caption text-sm-body-2">
                {{ item.scientificName }}
              </td>

              <td class="text-center">
                <span
                  :class="$vuetify.display.xs ? 'text-body-1' : 'text-h6'"
                  class="font-weight-black text-deep-orange-darken-2"
                >
                  {{ item.captiveRecord }}
                </span>
              </td>

              <td class="text-center d-none d-sm-table-cell">{{ item.wildRecord || '-' }}</td>
              <td class="text-body-2 text-grey-darken-1 d-none d-md-table-cell">
                {{ item.japaneseName }}
              </td>
              <td class="text-center text-body-2 d-none d-sm-table-cell">{{ item.year }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
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
    (a, b) => a.scientificName.localeCompare(b.scientificName) // 將原始資料按學名排序
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
