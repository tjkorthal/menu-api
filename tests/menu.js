let test = require('tape')
const Menu = require('../menu')

test('#find returns undefined when menu does not exist', function(t) {
  t.equal(Menu.find(1), undefined)
  t.end()
})

test('#find returns menu that exists', function(t) {
  Menu.create({ name: 'Test Menu' })
  t.deepEqual(Menu.find(1), { name: 'Test Menu', id: 1 })
  t.end()
})

test('#destroy returns undefined when a menu does not exist', function(t) {
  t.equal(Menu.destroy(99), undefined)
  t.end()
})

test('#destroy returns a menu that exists', function(t) {
  let menu = Menu.create({ name: 'Test Menu' })
  t.deepEqual(Menu.destroy(menu.id), { name: 'Test Menu', id: menu.id })
  t.end()
})

test('#destroy returns undefined on the second call', function(t) {
  let menu = Menu.create({ name: 'Test Menu' })
  Menu.destroy(menu.id)
  t.equal(Menu.destroy(menu.id), undefined)
  t.end()
})

test('#create returns the new menu', function(t) {
  let menu = Menu.create({ name: 'Test Menu' })
  t.equal(typeof menu, 'object')
  t.equal(menu.name, 'Test Menu')
  t.equal(typeof menu.id, 'number')
  t.end()
})

test('#create adds a menu to the store', function(t) {
  let menu = Menu.create({ name: 'Test Menu' })
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
  let menu = Menu.create({ name: "Tyler's menu" })
  let updatedMenu = Menu.update({ name: "Tylo's menu", id: menu.id })
  t.deepEqual(updatedMenu, { name: "Tylo's menu", id: menu.id })
  t.end()
})

test('#update persists changes', function(t) {
  let menu = Menu.create({ name: "Tyler's menu" })
  Menu.update({ name: "Tylo's menu", id: menu.id })
  t.deepEqual(Menu.find(menu.id), { name: "Tylo's menu", id: menu.id })
  t.end()
})
