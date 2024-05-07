require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 8080 // если не задан, то ставится порт 8080
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({})) // передаём пустой объект с опциями
app.use('/api', router)


//Последний мидлвэр
app.use(errorHandler)



const start = async () => {
    try {
        await sequelize.authenticate() // auth - асинхронная функция поэтому await
        await sequelize.sync() // сверяет состояние базы данных с описанной схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()