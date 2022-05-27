const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 1337


// MongoDB Connection
require('./config/boxchat.config')
app.use(cors(), express.json(), express.urlencoded({extended:true}))
require('./routes/boxchat.routes')(app)



app.listen(PORT, () => console.log('Listening to Port =>',PORT))
