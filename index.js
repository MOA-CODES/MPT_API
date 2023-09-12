//require
require('dotenv').config()
require('express-async-errors')

//security 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const eRateLimit = require('express-rate-limit')

//others
const connectDB = require('./db/connect')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found') 
const querystring = require('querystring')
const cookieparser = require('cookie-parser')

const express = require('express');
const app = express();

const port = process.env.PORT||3000

//app

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res)=>{
    res.send('MPT API')
})

app.use(notFound)
app.use(errorHandler)

connectDB()

app.listen(port ,()=>{
    console.log(`listening on port ${port}`)
})