const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 1337
const cookieParser = require('cookie-parser')


// MongoDB Connection
require('./config/boxchat.config')
app.use(cookieParser(), cors({credentials: true, origin:'http://localhost:3000'}), express.json(), express.urlencoded({extended:true}))

require('./routes/boxchat.routes')(app)

require('dotenv').config();


app.listen(PORT, () => console.log('Listening to Port =>',PORT))
