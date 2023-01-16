const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection
connection.on('connected', () => {
    console.log("Database connected")
})

connection.on('error', (err) => {
    console.log("Error happend while db connect ", err)
})

module.exports = mongoose