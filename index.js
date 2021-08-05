const express = require('express')
const app = express()

// use JSON parsing middleware
app.use(express.json())

const vendor = require('./routes/vendor')
const menu = require('./routes/menu')

app.use('/vendor', vendor)
app.use('/menu', menu)

app.listen(3000)
