const express = require('express')
const app = express()

// use JSON parsing middleware
app.use(express.json())

const Vendor = require('./vendor')

// add a vendor
app.post('/vendor', function(req, res) {
  let vendor = Vendor.create({ name: req.body.name })
  res.status(200).json(vendor)
})

// find a vendor
app.get('/vendor/:id', function(req, res) {
  let vendor = Vendor.find(req.params.id)
  if (vendor === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(vendor)
  }
})

// delete a vendor
app.delete('/vendor/:id', function(req, res) {
  let vendor = Vendor.destroy(req.params.id)
  if (vendor === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(vendor)
  }
})

// update a vendor
app.patch('/vendor/:id', function(req, res) {
  let vendor = Vendor.update(req.body)
  if (vendor === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(vendor)
  }
})

app.listen(3000)
