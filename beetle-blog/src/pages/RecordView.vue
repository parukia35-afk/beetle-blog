<template>
  <v-container>
    <div class="text-center my-10">
      <h1 class="text-h3 font-weight-bold mb-2">細身赤鍬形蟲屬</h1>
      <h2 class="text-h4 text-grey-darken-1 font-italic">Cyclommatus</h2>
    </div>

    <v-card border class="mb-10" flat>
      <v-table hover>
        <thead>
          <tr class="bg-grey-lighten-4">
            <th class="text-left font-weight-bold">中文俗名</th>
            <th class="text-left font-weight-bold">學名</th>
            <th class="text-left font-weight-bold">飼育紀錄</th>
            <th class="text-left font-weight-bold">野生紀錄</th>
            <th class="text-left font-weight-bold">日文俗名</th>
            <th class="text-left font-weight-bold">登錄年</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in records" :key="item.id">
            <td>{{ item.commonName }}</td>
            <td class="font-italic">{{ item.scientificName }}</td>
            <td class="text-primary font-weight-bold">{{ item.captiveRecord }} mm</td>
            <td>{{ item.wildRecord }} mm</td>
            <td>{{ item.japaneseName }}</td>
            <td>{{ item.year }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-card border class="pa-6" flat>
      <h3 class="text-h6 mb-4">發表評論</h3>
      <v-textarea
        auto-grow
        counter
        label="留下你的評論..."
        prepend-inner-icon="mdi-comment-outline"
        rows="4"
        variant="outlined"
      />
      <div class="d-flex justify-end mt-2">
        <v-btn color="primary" size="large">送出評論</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
// 這裡之後會從資料庫撈取，目前先用你設計稿中的假資料
  const records = [
    {
      id: 1,
      commonName: '艷細身赤',
      scientificName: 'asahinai',
      captiveRecord: 47.2,
      wildRecord: 48,
      japaneseName: 'アサヒナ(原名亞種)',
      year: 2025,
    },
    {
      id: 2,
      commonName: '雞冠細身赤',
      scientificName: 'mniszechi',
      captiveRecord: 55.4,
      wildRecord: 62,
      japaneseName: 'ミズヌマ(原名亞種)',
      year: 2024,
    },
  ]
</script>

<route lang="yaml">
path: /records
meta:
  layout: default
</route>
