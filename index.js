const express = require('express')
const app = express()

// use JSON parsing middleware
app.use(express.json())

// check for authorized user
const authorizer = require('./authorizer')
app.use(authorizer)

const vendor = require('./routes/vendor')
const menu = require('./routes/menu')

app.use('/vendor', vendor)
app.use('/menu', menu)

app.listen(3000)
