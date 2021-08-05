const express = require('express')
const router = express.Router()

const { Vendor, VendorInvalidError } = require('../vendor')

// add a vendor
router.post('/', function(req, res) {
  let vendor = Vendor.create(req.body)
  res.status(200).json(vendor)
})

router.route('/:id')
  // find a vendor
  .get(function(req, res) {
    let vendor = Vendor.find(req.params.id)
    if (vendor === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(vendor)
    }
  })
  // delete a vendor
  .delete(function(req, res) {
    let vendor = Vendor.destroy(req.params.id)
    if (vendor === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(vendor)
    }
  })
  // update a vendor
  .patch(function(req, res) {
    let vendor = Vendor.update(req.params.id, req.body)
    if (vendor === undefined) {
      res.status(404).end()
    } else {
      res.status(200).json(vendor)
    }
  })

// add 400 handler
router.use(function handle400(err, req, res, next) {
  if (err instanceof VendorInvalidError) {
    res.status(400).json(err.message)
  } else {
    next(err)
  }
})

module.exports = router
