const express = require('express')
const app = express()

// use JSON parsing middleware
app.use(express.json())

const Vendor = require('./vendor')
const Menu = require('./menu')

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

// add a menu
app.post('/menu', function(req, res) {
  let menu = Menu.create({ name: req.body.name })
  res.status(200).json(menu)
})

// find a menu
app.get('/menu/:id', function(req, res) {
  let menu = Menu.find(req.params.id)
  if (menu === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(menu)
  }
})

// delete a menu
app.delete('/menu/:id', function(req, res) {
  let menu = Menu.destroy(req.params.id)
  if (menu === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(menu)
  }
})

// update a menu
app.patch('/menu/:id', function(req, res) {
  let menu = Menu.update(req.body)
  if (menu === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(menu)
  }
})

app.listen(3000)
