import vuetify from 'eslint-config-vuetify'

export default [
  // 1. 保留原本 Vuetify 的所有設定
  ...vuetify(),

  // 2. 加入你自己的規則來「限制」ESLint 的行為
  {
    rules: {
      // 關閉「不允許 else return」的限制，這樣它就不會亂改你的 if...else 結構
      'no-else-return': 'off',

      // 確保它不會把你寫的大括號 {} 刪掉
      'curly': ['error', 'all'],

      // 關閉「禁止重複邏輯」的警告（如果你在 if 和 else 都寫了 push）
      'no-duplicated-branches': 'off',

      // 如果它一直要把你的代碼改成三元運算子 (?:)，可以關掉
      'no-ternary': 'off',

      // 這裡可以繼續加入你在 VS Code 報錯訊息中看到的其他規則名稱
      // 1. 最核心的設定：關閉強制將 forEach 轉換為 for...of 的規則
      'unicorn/no-array-for-each': 'off',

      // 2. 如果你是用的是 TypeScript，有時候這條也會影響
      'prefer-for-of': 'off',

      // 3. 確保你的 if...else 結構不會被簡化
      'no-else-return': 'off',
      'no-lonely-if': 'off'
    },
  },
]
