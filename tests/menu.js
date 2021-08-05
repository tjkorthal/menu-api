let test = require('tape')
const { Menu } = require('../menu')
const validMenuParams = {
  name: 'Test Menu',
  vendorId: 1
}

test('#find returns undefined when menu does not exist', function(t) {
  t.equal(Menu.find(1), undefined)
  t.end()
})

test('#find returns menu that exists', function(t) {
  Menu.create(validMenuParams)
  let menu = Menu.find(1)
  t.equal(menu.name, 'Test Menu')
  t.equal(menu.id, 1 )
  t.end()
})

test('#destroy returns undefined when a menu does not exist', function(t) {
  t.equal(Menu.destroy(99), undefined)
  t.end()
})

test('#destroy returns a menu that exists', function(t) {
  let menu = Menu.create(validMenuParams)
  let destroyedMenu = Menu.destroy(menu.id)
  t.equal(destroyedMenu.name, 'Test Menu')
  t.equal(destroyedMenu.id, menu.id)
  t.end()
})

test('#destroy returns undefined on the second call', function(t) {
  let menu = Menu.create(validMenuParams)
  Menu.destroy(menu.id)
  t.equal(Menu.destroy(menu.id), undefined)
  t.end()
})

test('#create returns the new menu', function(t) {
  let menu = Menu.create(validMenuParams)
  t.assert(menu instanceof Menu)
  t.equal(menu.name, 'Test Menu')
  t.equal(typeof menu.id, 'number')
  t.end()
})

test('#create adds a menu to the store', function(t) {
  let menu = Menu.create(validMenuParams)
  t.notEqual(Menu.find(menu.id), undefined)
  t.end()
})

test('#destroyAll returns an array of deleted menus', function(t) {
  let menus = Menu.destroyAll()
  t.assert(Array.isArray(menus))
  t.assert(menus.length > 0)
  t.end()
})

test('#destroyAll removes all menus from the store', function(t) {
  Menu.destroyAll()
  t.deepEqual(Menu.all(), [])
  t.end()
})

test('#update returns undefined when a menu does not exist', function(t) {
  t.equal(Menu.update(-1), undefined)
  t.end()
})

test('#update returns a menu that exists with new values', function(t) {
  let menu = Menu.create(validMenuParams)
  let updatedMenu = Menu.update(menu.id, { name: "Tylo's menu" })
  t.equal(updatedMenu.name,"Tylo's menu")
  t.equal(updatedMenu.id, menu.id)
  t.end()
})

test('#update persists changes', function(t) {
  let menu = Menu.create(validMenuParams)
  Menu.update(menu.id, { name: "Tylo's menu" })
  let updatedMenu = Menu.find(menu.id)
  t.equal(updatedMenu.name, "Tylo's menu")
  t.equal(updatedMenu.id, menu.id)
  t.end()
})
