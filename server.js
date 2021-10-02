require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/categoryRouter')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload(
    {
        useTempFiles: true
    }
))

// connect to mongoDB
const URI = process.env.MONGODB_URL_LOCAL
mongoose.connect(URI, {
   useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connect to MobgoDB');
})

// Routers
app.use('/user', userRouter)
app.use('/api', categoryRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log('Server is running', PORT);
})
