import mongoose from 'mongoose';
import 'dotenv/config';
import Record from './models/record.js';

const rawData = [
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "紅腿刀鍬",
    "scientificName": "rubrofemoratus rubrofemoratus",
    "captiveRecord": 61.7,
    "wildRecord": 58.5,
    "japaneseName": "アカアシ",
    "year": 2017,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "紅腿刀鍬(北方亞種)",
    "scientificName": "rubrofemoratus chenpengi",
    "captiveRecord": 51.3,
    "wildRecord": 43.0,
    "japaneseName": "アカアシ（chenpengi）",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "紅腿刀鍬(西部亞種)",
    "scientificName": "rubrofemoratus miyamai",
    "captiveRecord": 53.2,
    "wildRecord": 40.0,
    "japaneseName": "アカアシ（miyamai）",
    "year": 2024,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "阿基蘇培煞斯小鍬",
    "scientificName": "axisopsis",
    "captiveRecord": 33.4,
    "wildRecord": 32.0,
    "japaneseName": "アクシソプシス",
    "year": 2016,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "紅背刀鍬",
    "scientificName": "arrowi nobuhiroi",
    "captiveRecord": 71.7,
    "wildRecord": 72.0,
    "japaneseName": "アロー（タイ）",
    "year": 2007,
    "isTaiwanese": false,
    "isFamous": true
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "",
    "scientificName": "arrowi magdeleinae",
    "captiveRecord": 68.1,
    "wildRecord": 60.5,
    "japaneseName": "アロー( マクダレイン)",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "",
    "scientificName": "arrowi arrowi",
    "captiveRecord": 71.6,
    "wildRecord": 62.0,
    "japaneseName": "アロー（原名亜種）",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "",
    "scientificName": "arrowi lieni",
    "captiveRecord": 78.6,
    "wildRecord": 73.0,
    "japaneseName": "アロー（中央越南）",
    "year": 2024,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "雙鉤鍬形蟲",
    "scientificName": "Miwanus formosanus?",
    "captiveRecord": 44.6,
    "wildRecord": 42.2,
    "japaneseName": "ウスバ（カプリコルヌス）",
    "year": 2024,
    "isTaiwanese": true,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "",
    "scientificName": "Miwanus formosanus",
    "captiveRecord": 39.4,
    "wildRecord": 37.1,
    "japaneseName": "ウスバ（原名亜種）",
    "year": 2011,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "亞拉岡",
    "scientificName": "Digonphorus elegans",
    "captiveRecord": 40.3,
    "wildRecord": 39.3,
    "japaneseName": "エレガンスセスジ",
    "year": 2018,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "艾勒岡托斯刀鍬",
    "scientificName": "elegantulus",
    "captiveRecord": 32.5,
    "wildRecord": 29.4,
    "japaneseName": "エレガントゥルス( 蘇門答臘・婆羅洲)",
    "year": 2011,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "喀欽刀鍬",
    "scientificName": "katctinensis",
    "captiveRecord": 57.0,
    "wildRecord": 57.3,
    "japaneseName": "カチン",
    "year": 2007,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "錯那刀鍬",
    "scientificName": "kikunoae",
    "captiveRecord": 48.3,
    "wildRecord": 45.7,
    "japaneseName": "キクノ",
    "year": 2020,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "〈尚無中文名〉",
    "scientificName": "cuongi",
    "captiveRecord": 43.3,
    "wildRecord": 40.3,
    "japaneseName": "クォン",
    "year": 2010,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "澤井氏小鍬越南亞種",
    "scientificName": "sawaii norikoae",
    "captiveRecord": 48.2,
    "wildRecord": 46.0,
    "japaneseName": "サワイ（越南）",
    "year": 2011,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "中國條紋鍬",
    "scientificName": "cuongi",
    "captiveRecord": 41.8,
    "wildRecord": 37.3,
    "japaneseName": "スジ（中国）",
    "year": 2021,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "裂紋大鍬",
    "scientificName": "suturalis",
    "captiveRecord": 55.1,
    "wildRecord": 50.0,
    "japaneseName": "スツラリス",
    "year": 2024,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "〈尚無中文名〉",
    "scientificName": "segue",
    "captiveRecord": 36.6,
    "wildRecord": 30.6,
    "japaneseName": "セグー",
    "year": 2022,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "瑟梅諾小鍬",
    "scientificName": "semenowi",
    "captiveRecord": 46.39,
    "wildRecord": 47.0,
    "japaneseName": "セメノウ",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "華南小刀鍬",
    "scientificName": "Falcicornis songianus",
    "captiveRecord": 39.4,
    "wildRecord": 37.0,
    "japaneseName": "ソン",
    "year": 2021,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "田中氏大鍬",
    "scientificName": "tanakai",
    "captiveRecord": 49.0,
    "wildRecord": 44.0,
    "japaneseName": "タナカ",
    "year": 2014,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "〈尚無中文名〉",
    "scientificName": "dacidis",
    "captiveRecord": 36.3,
    "wildRecord": 32.0,
    "japaneseName": "ダビディス",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "中華刀鍬",
    "scientificName": "sinensis sinensis",
    "captiveRecord": 47.0,
    "wildRecord": 45.9,
    "japaneseName": "チュウゴク(原名亜種)",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "",
    "scientificName": "sinensis ?",
    "captiveRecord": 60.0,
    "wildRecord": 63.0,
    "japaneseName": "チュウゴク（越南）",
    "year": 2007,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "細脊刀鍬",
    "scientificName": "tenuecostatus",
    "captiveRecord": 38.5,
    "wildRecord": 38.0,
    "japaneseName": "テヌエコスタトゥス(mochizukii)",
    "year": 2021,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "印度短刀鍬",
    "scientificName": "derelictus",
    "captiveRecord": 49.2,
    "wildRecord": 47.0,
    "japaneseName": "デレリクトゥス",
    "year": 2024,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "登奇爾小鍬",
    "scientificName": "donckieri hangpui",
    "captiveRecord": 76.0,
    "wildRecord": 78.3,
    "japaneseName": "ドンキエル（hangpui）",
    "year": 2011,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "",
    "scientificName": "donckieri donckieri",
    "captiveRecord": 78.5,
    "wildRecord": 79.5,
    "japaneseName": "ドンキエル（原名亜種）",
    "year": 2017,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "德氏大鍬",
    "scientificName": "derelictus",
    "captiveRecord": 49.0,
    "wildRecord": 49.0,
    "japaneseName": "ニンティ",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "尼泊爾刀鍬",
    "scientificName": "nepalensis",
    "captiveRecord": 78.4,
    "wildRecord": 80.0,
    "japaneseName": "ネパール",
    "year": 2016,
    "isTaiwanese": false,
    "isFamous": true
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "貴州雷公刀鍬",
    "scientificName": "haitschunus",
    "captiveRecord": 65.8,
    "wildRecord": 62.0,
    "japaneseName": "ハイチュヌス",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "彎月",
    "scientificName": "bisignatus",
    "captiveRecord": 41.4,
    "wildRecord": 41.5,
    "japaneseName": "ビシグナートゥス",
    "year": 2021,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "喜瑪拉雅小鍬",
    "scientificName": "himalayae",
    "captiveRecord": 42.0,
    "wildRecord": 34.0,
    "japaneseName": "ヒマラヤ",
    "year": 2021,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "吹拔氏刀鍬",
    "scientificName": "fukinukii",
    "captiveRecord": 58.5,
    "wildRecord": 57.5,
    "japaneseName": "フキヌキ",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "越南小鍬",
    "scientificName": "fujiii",
    "captiveRecord": 49.4,
    "wildRecord": 44.2,
    "japaneseName": "フジイスジ",
    "year": 2012,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "普斯達克希斯大鍬",
    "scientificName": "pseudaxis",
    "captiveRecord": 31.3,
    "wildRecord": 32.5,
    "japaneseName": "プセウダクシス",
    "year": 2018,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "布氏刀鍬",
    "scientificName": "branaungi",
    "captiveRecord": 60.4,
    "wildRecord": 70.5,
    "japaneseName": "ブラナウン",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "瑪格蕾",
    "scientificName": "macleayii",
    "captiveRecord": 68.7,
    "wildRecord": 71.3,
    "japaneseName": "マクレイ",
    "year": 2025,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "秀麗小鍬",
    "scientificName": "mellianus",
    "captiveRecord": 37.6,
    "wildRecord": 33.1,
    "japaneseName": "メリアヌス",
    "year": 2019,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "美麗迪歐",
    "scientificName": "meridionalis",
    "captiveRecord": 49.6,
    "wildRecord": 45.2,
    "japaneseName": "メリディオナリス",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "刀鍬",
    "scientificName": "yamadai",
    "captiveRecord": 65.8,
    "wildRecord": 61.5,
    "japaneseName": "ヤマダ",
    "year": 2024,
    "isTaiwanese": true,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "雄辯大鍬",
    "scientificName": "ratiocinativus",
    "captiveRecord": 37.9,
    "wildRecord": 33.7,
    "japaneseName": "ラティオキナティブス",
    "year": 2020,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "比西納小鍬",
    "scientificName": "rufonotatus rufonotatus",
    "captiveRecord": 41.8,
    "wildRecord": 38.0,
    "japaneseName": "ルフォノタトゥス（原名亜種）",
    "year": 2020,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "奄美小鍬",
    "scientificName": "amamianus amamianus",
    "captiveRecord": 40.8,
    "wildRecord": 37.8,
    "japaneseName": "アマミコクワ",
    "year": 2009,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "德之島小鍬",
    "scientificName": "amamianus kubotai",
    "captiveRecord": 41.5,
    "wildRecord": 38.0,
    "japaneseName": "トクノシマコクワ",
    "year": 2005,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "琉球小鍬",
    "scientificName": "amamianus nomurai",
    "captiveRecord": 39.2,
    "wildRecord": 36.3,
    "japaneseName": "リュウキュウコクワ",
    "year": 2007,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "八重山小鍬",
    "scientificName": "amamianus yaeyamaensis",
    "captiveRecord": 43.4,
    "wildRecord": 38.0,
    "japaneseName": "ヤエヤマコクワ",
    "year": 2015,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "日本小鍬",
    "scientificName": "rectus rectus",
    "captiveRecord": 58.1,
    "wildRecord": 54.6,
    "japaneseName": "コクワ",
    "year": 2016,
    "isTaiwanese": false,
    "isFamous": true
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "八丈小鍬",
    "scientificName": "rectus miekoae",
    "captiveRecord": 52.6,
    "wildRecord": 49.0,
    "japaneseName": "ハチジョウコクワ",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "甑島小鍬",
    "scientificName": "rectus yakushimaensis",
    "captiveRecord": 54.6,
    "wildRecord": 53.6,
    "japaneseName": "ヤクシマコクワ",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "大隈小鍬",
    "scientificName": "rectus mishimaensis",
    "captiveRecord": 52.3,
    "wildRecord": 49.4,
    "japaneseName": "ミシマコクワ",
    "year": 2022,
    "isTaiwanese": false,
    "isFamous": false
  },
  {
    "genus": "小鍬形蟲類群(大鍬屬) Dorcus",
    "commonName": "吐噶喇小鍬",
    "scientificName": "rectus kobayashii",
    "captiveRecord": 54.5,
    "wildRecord": 50.7,
    "japaneseName": "トカラコクワ",
    "year": 2023,
    "isTaiwanese": false,
    "isFamous": false
  }
]

// 補值魔法：將「尚無中文名」視為有效來源
let lastCommonName = ""; 

const fixedData = rawData.map(item => {
  if (item.commonName === "" || item.commonName === null) {
    // 遇到空白，直接抄上一筆（可能是正式名，也可能是〈尚無中文名〉）
    item.commonName = lastCommonName;
  } else {
    // 只要有字，就更新目前的俗名來源
    lastCommonName = item.commonName;
  }
  return item;
});

async function importData() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ 已連接 MongoDB');

    // 請確保 models/record.js 裡的 unique 已經移除
    await Record.deleteMany({});
    console.log('🗑️  舊資料已清除');

    const result = await Record.insertMany(fixedData); 
    console.log(`✨ 成功！已匯入 ${result.length} 筆資料。`);
    console.log(`💡 提示：現在所有亞種都已繼承其物種名稱（包含〈尚無中文名〉）。`);

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error('❌ 匯入失敗：', error);
    process.exit(1);
  }
}

importData();