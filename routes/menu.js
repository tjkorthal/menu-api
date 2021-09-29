const express = require('express')
const router = express.Router()

const { Menu, MenuInvalidError } = require('../menu')
const menuItem = require('./menuItem')

// add a menu
router.post('/', function(req, res) {
  let menu = Menu.create(req.body)
  res.status(201).json(menu)
})

router.route('/:id')
  // find a menu
  .get(function(req, res) {
    let menu = Menu.find(req.params.id)
    if (menu === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(menu)
    }
  })
  // delete a menu
  .delete(function(req, res) {
    let menu = Menu.destroy(req.params.id)
    if (menu === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(menu)
    }
  })
  // update a menu
  .patch(function(req, res) {
    let menu = Menu.update(req.params.id, req.body)
    if (menu === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(menu)
    }
  })

router.use('/:menuId/item', menuItem)

// add 400 handler
router.use(function handle400(err, req, res, next) {
  if (err instanceof MenuInvalidError) {
    res.status(400).json(err.message)
  } else {
    next(err)
  }
})

module.exports = router
