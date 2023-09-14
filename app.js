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
const auth = require('./middleware/Authentication')
const auth_R = require('./routes/auth_R')
const auth_sR = require('./routes/auth_sR')


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

app.use('/api/v1/auth', auth_R)
app.use('/api/v1/spotify', auth, auth_sR)


app.use(notFound)
app.use(errorHandler)

connectDB()

app.listen(port ,()=>{
    console.log(`listening on port ${port}`)
})