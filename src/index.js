const express = require('express')
require('./db/mongoose')
const orderRouter = require('./router/order')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(orderRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})