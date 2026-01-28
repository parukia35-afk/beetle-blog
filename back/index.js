import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routeRecord from './routes/record.js'
import routeUser from './routes/user.js'
import routeProduct from './routes/product.js'
import routeArticle from './routes/article.js'
import './passport/passport.js'

mongoose
  .connect(process.env.DB_URL)
  .then(()=>{
    console.log('資料庫連線成功')
  })
  .catch((error)=>{
    console.log('資料庫連線失敗')
    console.log(error)
  })

  const app = express()

  app.use(cors()) // 允許跨域請求
  app.use(express.json()) // 讓express看得懂JSON

  app.use('/record',routeRecord)
  app.use('/user',routeUser)
  app.use('/product',routeProduct)
  app.use('/article',routeArticle)

  app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動 http://localhost:4000')
})