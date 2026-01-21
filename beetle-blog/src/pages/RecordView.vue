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

    <div v-for="groupObj in genusClassification" :key="groupObj.genusName" class="mb-10 mb-md-16">
      <v-sheet
        :style="{ backgroundColor: groupObj.bgColor, color: groupObj.textColor }"
        :class="$vuetify.display.xs ? 'pa-3' : 'pa-5'"
        class="rounded-t-xl d-flex align-center"
      >
        <v-icon
          icon="mdi-bug"
          :style="{ color: groupObj.textColor }"
          :class="$vuetify.display.xs ? 'mr-2' : 'mr-4'"
          :size="$vuetify.display.xs ? '24' : '36'"
        ></v-icon>
        <h2 :class="$vuetify.display.xs ? 'text-h6' : 'text-h4'" class="font-weight-bold">
          {{ groupObj.genusName }}
        </h2>
        <v-spacer></v-spacer>
        <v-chip
          :color="groupObj.textColor === 'white' ? 'primary' : 'black'"
          variant="elevated"
          class="font-weight-black"
          :size="$vuetify.display.xs ? 'small' : 'large'"
        >
          <v-icon start icon="mdi-database-outline" class="d-none d-sm-inline-flex"></v-icon>
          {{ groupObj.list.length }} 筆
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
            <tr v-for="(item, index) in groupObj.list" :key="item._id">
              <td
                :class="$vuetify.display.xs ? 'text-body-1' : 'text-h6'"
                class="font-weight-bold text-primary"
              >
                {{ shouldShowName(groupObj.list, index) ? item.commonName : '' }}
              </td>

              <td class="font-italic text-grey-darken-2 text-caption text-sm-body-2">
                {{ item.scientificName }}
              </td>

              <td class="text-center">
                <span
                  :class="$vuetify.display.xs ? 'text-body-1' : 'text-h6'"
                  class="font-weight-black text-deep-orange-darken-2"
                >
                  {{ formatNumber(item.captiveRecord) }}
                </span>
              </td>

              <td class="text-center d-none d-sm-table-cell">
                {{ formatNumber(item.wildRecord) || '-' }}
              </td>
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

// 紀錄尺寸補零函式
const formatNumber = (num) => {
  if (num === null || num === undefined || num === '') return '-'
  return Number(num).toFixed(1)
}

const GENUS_CONFIG = [
  {
    name: '細身赤鍬形蟲屬 Cyclommatus',
    bgColor: '#efbe90',
    textColor: 'black'
  },
  {
    name: '鋸鍬形蟲屬 Prosopocoilus',
    bgColor: '#732b05',
    textColor: 'white'
  },
  {
    name: '鉗鍬屬 Kirchnerius',
    bgColor: 'linear-gradient(135deg, #0693e3 0%, #a31c1c 36%, #9b51e0 100%)',
    textColor: 'white'
  },
  {
    name: '前鍬屬 Epidorcus',
    bgColor: 'linear-gradient(135deg, #ba974a 0%, #a31c1c 36%, #691f1f 48%, #9b51e0 100%)',
    textColor: 'white'
  },
  {
    name: '叉角鍬形蟲屬 Hexarthrius',
    bgColor: '#0963C4',
    textColor: 'white'
  },
  {
    name: '鹿角、金剛鹿角、偽鹿角鍬形蟲等屬 Rhaetulus、Rhaetus、Pseudorhaetus',
    bgColor: '#14e5db',
    textColor: 'black'
  },
  {
    name: '小鍬形蟲類群(大鍬屬) Dorcus',
    bgColor: '#111111',
    textColor: 'white'
  },
  {
    name: '大鍬(大鍬屬) Dorcus',
    bgColor: '#111111',
    textColor: 'white'
  },
  {
    name: '扁鍬(大鍬屬) Dorcus',
    bgColor: '#111111',
    textColor: 'white'
  },
  {
    name: '豔鍬屬 Odontolabis',
    bgColor: '#23883D',
    textColor: 'white'
  },
  {
    name: '圓翅鍬屬 Neolucanus',
    bgColor: '#333300',
    textColor: 'white'
  },
  {
    name: '黃金鬼屬 Allotopus',
    bgColor: '#f2ca00',
    textColor: 'black'
  },
  {
    name: '深山屬 Lucanus',
    bgColor: '#cf0034',
    textColor: 'white'
  },
  {
    name: '肥角屬 Aegus',
    bgColor: '#0946e0',
    textColor: 'white'
  },
  {
    name: '其他 Others',
    bgColor: '#7e7ce4',
    textColor: 'white'
  }
]

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
  const groups = {} // 建立一個暫存物件。
  rawBekuwaRecords.value.forEach((item) => {
    if (!groups[item.genus]) groups[item.genus] = [] // 如果暫存陣列裡沒有一個跟迴圈到的資料的屬名同名的key，則開一個key為該屬名，其值為空陣列。
    groups[item.genus].push(item) // 然後將迴圈到的資料 push到 跟自己的屬名相同的 key名的陣列裡。
    // 現在，暫存物件裡，已經按屬名將資料分到對應屬名的key的陣列裡了。
    // groups = {C屬:[{長頸鹿的資料},{孔夫子的資料}...], D屬:[{安達的資料},{長角的資料}...]}
  })
  const orderedResult = [] // 開一個空陣列，用來儲存依GENUS_ORDER定義的排序的結果。
  GENUS_CONFIG.forEach((config) => {
    if (groups[config.name]) {
      // 如果暫存陣列裡有跟迴圈到的屬名同名的key名
      orderedResult.push({
        // 在orderedResult push 一個新物件，其key:genusName的值為迴圈跑到的屬名，其key:list的值是直接把暫存資料裡該屬key的值全部搬過來，並且依學名排序。
        genusName: config.name,
        list: groups[config.name].sort((a, b) => a.scientificName.localeCompare(b.scientificName)),
        bgColor: config.bgColor,
        textColor: config.textColor
      })
      delete groups[config.name] // 把該屬從暫存資料刪除，代表處理過了。這裡很關鍵!!是為後面的保險鋪路。
    }
  })
  // orderedResult=[{genusName:C屬, list:[{學名a為首的蟲的資料},{學名b為首的蟲的資料}...]},{genusName:P屬, list:[{學名a為首的蟲的資料},{學名b為首的蟲的資料}...]}...]

  Object.keys(groups).forEach((genusName) => {
    orderedResult.push({
      genusName: genusName,
      list: groups[genusName].sort((a, b) => a.scientificName.localeCompare(b.scientificName)),
      bgColor: '#424242',
      textColor: 'white'
    })
  })

  return orderedResult
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
