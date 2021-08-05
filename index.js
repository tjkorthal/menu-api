const express = require('express')
const app = express()

// use JSON parsing middleware
app.use(express.json())

const vendor = require('./routes/vendor')
const menu = require('./routes/menu')
const MenuItem = require('./menuItem')

app.use('/vendor', vendor)
app.use('/menu', menu)

// add a menu item
app.post('/menu/:menuId/item', function(req, res) {
  let item = MenuItem.create({
    menuId: req.params.id,
    ...req.body
  })
  res.status(200).json(item)
})

// find a menu item
app.get('/menu/:menuId/item/:id', function(req, res) {
  let item = MenuItem.find(req.params.id)
  if (item === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(item)
  }
})

// delete a menu item
app.delete('/menu/:menuId/item/:id', function(req, res) {
  let item = MenuItem.destroy(req.params.id)
  if (item === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(item)
  }
})

// update a menu item
app.patch('/menu/:menuId/item/:id', function(req, res) {
  let item = MenuItem.update(req.params.id, req.body)
  if (item === undefined) {
    res.status(404).end()
  } else {
    res.status(200).json(item)
  }
})

app.listen(3000)
