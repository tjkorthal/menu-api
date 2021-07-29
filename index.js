const express = require('express')
const app = express()

// add a vendor
app.post('/vendor', function(req, res) {
  res.status(200).end()
})

app.listen(3000)
