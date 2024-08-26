const connectTomongo = require('./db')
const express = require('express')
const app = express()

connectTomongo()

var cors = require('cors')
app.use(cors())


const port = 3002
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})