const express = require('express')
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const morgan = require("morgan")
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')
const doctorRoute = require('./routes/doctorsRoutes')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 8080;
morgan("dev")

// Use the CORS middleware
app.use(cors());
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/doctor', doctorRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))