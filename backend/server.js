const express = require('express')
require('dotenv').config()
const dbConfig = require('./config/dbConfig')

const app = express()
const port = process.env.PORT || 8080;




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))