let test = require('tape')
const Vendor = require('../vendor')

test('#find returns undefined when vendor does not exist', function(t) {
  t.equal(Vendor.find(1), undefined)
  t.end()
})

test('#find returns vendor that exists', function(t) {
  Vendor.create({ name: 'Test Vendor' })
  t.deepEqual(Vendor.find(1), { name: 'Test Vendor', id: 1 })
  t.end()
})

test('#destroy returns undefined when a vendor does not exist', function(t) {
  t.equal(Vendor.destroy(99), undefined)
  t.end()
})

test('#destroy returns a vendor that exists', function(t) {
  let vendor = Vendor.create({ name: 'Test Vendor' })
  t.deepEqual(Vendor.destroy(vendor.id), { name: 'Test Vendor', id: vendor.id })
  t.end()
})

test('#destroy returns undefined on the second call', function(t) {
  let vendor = Vendor.create({ name: 'Test Vendor' })
  Vendor.destroy(vendor.id)
  t.equal(Vendor.destroy(vendor.id), undefined)
  t.end()
})

test('#create returns the new vendor', function(t) {
  let vendor = Vendor.create({ name: 'Test Vendor' })
  t.equal(typeof vendor, 'object')
  t.equal(vendor.name, 'Test Vendor')
  t.equal(typeof vendor.id, 'number')
  t.end()
})

test('#create adds a vendor to the store', function(t) {
  let vendor = Vendor.create({ name: 'Test Vendor' })
  t.notEqual(Vendor.find(vendor.id), undefined)
  t.end()
})

test('#destroyAll returns an array of deleted vendors', function(t) {
  let vendors = Vendor.destroyAll()
  t.assert(Array.isArray(vendors))
  t.assert(vendors.length > 0)
  t.end()
})

test('#destroyAll removes all vendors from the store', function(t) {
  Vendor.destroyAll()
  t.deepEqual(Vendor.all(), [])
  t.end()
})

test('#update returns undefined when a vendor does not exist', function(t) {
  t.equal(Vendor.update(-1), undefined)
  t.end()
})

test('#update returns a vendor that exists with new values', function(t) {
  let vendor = Vendor.create({ name: 'Tyler' })
  let updatedVendor = Vendor.update({ name: 'Tylo', id: vendor.id })
  t.deepEqual(updatedVendor, { name: 'Tylo', id: vendor.id })
  t.end()
})

test('#update persists changes', function(t) {
  let vendor = Vendor.create({ name: 'Tyler' })
  Vendor.update({ name: 'Tylo', id: vendor.id })
  t.deepEqual(Vendor.find(vendor.id), { name: 'Tylo', id: vendor.id })
  t.end()
})
