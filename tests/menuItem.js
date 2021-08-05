let test = require('tape')
const MenuItem = require('../menuItem')

test('#find returns undefined when menuItem does not exist', function(t) {
  t.equal(MenuItem.find(1), undefined)
  t.end()
})

test('#find returns menuItem that exists', function(t) {
  MenuItem.create({ name: 'Test MenuItem' })
  let menuItem = MenuItem.find(1)
  t.equal(menuItem.name, 'Test MenuItem')
  t.equal(menuItem.id, 1 )
  t.end()
})

test('#destroy returns undefined when a menuItem does not exist', function(t) {
  t.equal(MenuItem.destroy(99), undefined)
  t.end()
})

test('#destroy returns a menuItem that exists', function(t) {
  let menuItem = MenuItem.create({ name: 'Test MenuItem' })
  let destroyedItem = MenuItem.destroy(menuItem.id)
  t.deepEqual(destroyedItem.name, 'Test MenuItem')
  t.deepEqual(destroyedItem.id, menuItem.id)
  t.end()
})

test('#destroy returns undefined on the second call', function(t) {
  let menuItem = MenuItem.create({ name: 'Test MenuItem' })
  MenuItem.destroy(menuItem.id)
  t.equal(MenuItem.destroy(menuItem.id), undefined)
  t.end()
})

test('#create returns the new menuItem', function(t) {
  let menuItem = MenuItem.create({ name: 'Test MenuItem' })
  t.assert(menuItem instanceof MenuItem)
  t.equal(menuItem.name, 'Test MenuItem')
  t.equal(typeof menuItem.id, 'number')
  t.end()
})

test('#create adds a menuItem to the store', function(t) {
  let menuItem = MenuItem.create({ name: 'Test MenuItem' })
  t.notEqual(MenuItem.find(menuItem.id), undefined)
  t.end()
})

test('#destroyAll returns an array of deleted menuItems', function(t) {
  let menuItems = MenuItem.destroyAll()
  t.assert(Array.isArray(menuItems))
  t.assert(menuItems.length > 0)
  t.end()
})

test('#destroyAll removes all menuItems from the store', function(t) {
  MenuItem.destroyAll()
  t.deepEqual(MenuItem.all(), [])
  t.end()
})

test('#update returns undefined when a menuItem does not exist', function(t) {
  t.equal(MenuItem.update(-1), undefined)
  t.end()
})

test('#update returns a menuItem that exists with new values', function(t) {
  let menuItem = MenuItem.create({ name: "Tyler's menuItem" })
  let updatedMenuItem = MenuItem.update(menuItem.id, { name: "Tylo's menuItem" })
  t.equal(updatedMenuItem.name, "Tylo's menuItem")
  t.equal(updatedMenuItem.id, menuItem.id)
  t.end()
})

test('#update persists changes', function(t) {
  let menuItem = MenuItem.create({ name: "Tyler's menuItem" })
  MenuItem.update(menuItem.id, { name: "Tylo's menuItem" })
  let updatedMenuItem = MenuItem.find(menuItem.id)
  t.equal(updatedMenuItem.name, "Tylo's menuItem")
  t.equal(updatedMenuItem.id, menuItem.id)
  t.end()
})
