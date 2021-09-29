const express = require('express')
const router = express.Router()

const { MenuItem, MenuItemInvalidError } = require('../menuItem')

// add a menu item
router.post('/', function(req, res) {
  let menu = MenuItem.create(req.body)
  res.status(201).json(menu)
})

router.route('/:id')
  // find a menu item
  .get(function(req, res) {
    let menu = MenuItem.find(req.params.id)
    if (menu === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(menu)
    }
  })
  // delete a menu item
  .delete(function(req, res) {
    let menu = MenuItem.destroy(req.params.id)
    if (menu === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(menu)
    }
  })
  // update a menu item
  .patch(function(req, res) {
    let menu = MenuItem.update(req.params.id, req.body)
    if (menu === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(menu)
    }
  })

// add 400 handler
router.use(function handle400(err, req, res, next) {
  if (err instanceof MenuItemInvalidError) {
    res.status(400).json(err.message)
  } else {
    next(err)
  }
})

module.exports = router
