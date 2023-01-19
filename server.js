require('dotenv').config()
const express = require('express')
const app = express()
const path =  require('path')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConn')
const verifyToken = require('./middleware/verifyJWT')
const mongoose = require('mongoose')

// deployment config
const PORT = process.env.PORT || 6060

mongoose.set('strictQuery', false)
// connect to mongodb
connectDB()

// config - built-in middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, '/public')))

// middleware
app.use(require('./middleware/logEvents'))

// routes
app.use('/', require('./routes/root'))

// MVC REST API ROUTES
app.use(require('./routes/api/auth'))
app.use(require('./routes/api/register'))
app.use(require('./routes/api/refresh'))
app.use(require('./routes/api/logout'))

// protected routes
app.use(verifyToken) // middleware for route protecting
app.use(require('./routes/api/employees'))
app.use(require('./routes/api/cars'))

app.get('/*', (req,res)=> {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

mongoose.connection.once('open', () => {
    console.log('db is connected...');
    app.listen(PORT, () => console.log(`Server is running on http://${hostname}:${PORT}`))
})