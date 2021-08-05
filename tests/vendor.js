let test = require('tape')
const { Vendor } = require('../vendor')
const validVendorParams = {
  name: 'Test Vendor',
  phone: '555-123-4567',
  website: 'example.com',
  email: 'tjkorthal@example.com'
}

test('#find returns undefined when vendor does not exist', function(t) {
  t.equal(Vendor.find(1), undefined)
  t.end()
})

test('#find returns vendor that exists', function(t) {
  Vendor.create(validVendorParams)
  let vendor = Vendor.find(1)
  t.assert(vendor instanceof Vendor)
  t.equal(vendor.name, 'Test Vendor')
  t.end()
})

test('#destroy returns undefined when a vendor does not exist', function(t) {
  t.equal(Vendor.destroy(99), undefined)
  t.end()
})

test('#destroy returns a vendor that exists', function(t) {
  let vendor = Vendor.create(validVendorParams)
  let destroyedVendor = Vendor.destroy(vendor.id)
  t.equal(destroyedVendor.name, 'Test Vendor')
  t.equal(destroyedVendor.id, vendor.id )
  t.end()
})

test('#destroy returns undefined on the second call', function(t) {
  let vendor = Vendor.create(validVendorParams)
  Vendor.destroy(vendor.id)
  t.equal(Vendor.destroy(vendor.id), undefined)
  t.end()
})

test('#create returns the new vendor', function(t) {
  let vendor = Vendor.create(validVendorParams)
  t.assert(vendor instanceof Vendor)
  t.equal(vendor.name, 'Test Vendor')
  t.equal(typeof vendor.id, 'number')
  t.end()
})

test('#create adds a vendor to the store', function(t) {
  let vendor = Vendor.create(validVendorParams)
  t.notEqual(Vendor.find(vendor.id), undefined)
  t.end()
})

test('#create throws an error if the vendor is invalid', function(t) {
  t.throws(() => Vendor.create({ name: 'Foo' }))
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
  let vendor = Vendor.create(validVendorParams)
  let updatedVendor = Vendor.update(vendor.id, { name: 'Tylo' })
  t.equal(updatedVendor.name, 'Tylo')
  t.equal(updatedVendor.id, vendor.id)
  t.end()
})

test('#update persists changes', function(t) {
  let vendor = Vendor.create(validVendorParams)
  Vendor.update(vendor.id, { name: 'Tylo' })
  let updatedVendor = Vendor.find(vendor.id)
  t.equal(updatedVendor.name, 'Tylo')
  t.equal(updatedVendor.id, vendor.id )
  t.end()
})
