//require
require('dotenv').config()
require('express-async-errors')

//security 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const eRateLimit = require('express-rate-limit')

//others
// const {$} = require('jquery')
const connectDB = require('./db/connect')

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found') 
const auth = require('./middleware/Authentication')

const main_R = require('./routes/main_R')
const auth_R = require('./routes/auth_R')
const auth_sR = require('./routes/auth_sR')

const querystring = require('querystring')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const express = require('express');
const app = express();

const port = process.env.PORT||3000

//app
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy-Report-Only',

    //   'Content-Security-Policy',
      "default-src 'self'; script-src-elem 'none' https://cdnjs.cloudflare.com; font-src 'self'; img-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://cdn.jsdelivr.net; frame-src 'self'"
    );
    next();
  });

app.use (bodyparser.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(xss())


app.use('/js', express.static(path.resolve(__dirname,"public/js")))
app.use('/', main_R)
app.use('/api/v1/auth', auth_R)
app.use('/api/v1/spotify', auth, auth_sR)


app.use(notFound)
app.use(errorHandler)

connectDB()

app.listen(port ,()=>{
    console.log(`listening on port ${port}`)
})