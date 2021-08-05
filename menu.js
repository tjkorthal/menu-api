// const menuSchema = {
//   id: 2,
//   name: "Bar",
//   vendorId: 1
// }

const MENUS = []
let menuID = 1;

class MenuInvalidError extends Error {
  constructor(...params) {
    super(...params)
  }
}

function validateId(id) {
  if (id > 0) return

  throw new MenuInvalidError('ID must be present')
}

function validateName(name) {
  if (typeof name === 'string' && name.length >= 3) return

  throw new MenuInvalidError('Name must be at least 3 characters long')
}

function validateVendorId(id) {
  if (id > 0) return

  throw new MenuInvalidError('Vendor ID must be present')
}

function validateMenu(menu) {
  validateId(menu.id)
  validateName(menu.name)
  validateVendorId(menu.vendorId)
}

class Menu {
  constructor(params) {
    this.id = Number.parseInt(params.id)
    this.name = params.name
    this.vendorId = Number.parseInt(params.vendorId)
  }

  static all() {
    return MENUS
  }

  static create(params) {
    let menu = new Menu({
      name: params.name,
      vendorId: params.vendorId,
      id: menuID++
    })
    validateMenu(menu)
    MENUS.push(menu)
    return menu
  }

  static destroy(id) {
    let menu = this.find(id)
    if (menu === undefined) { return undefined }

    let index = MENUS.indexOf(menu)
    MENUS.splice(index, 1)

    return menu
  }

  static destroyAll() {
    return MENUS.map(x => MENUS.shift())
  }

  static find(id) {
    return MENUS.find(menu => menu.id == id)
  }

  static update(id, params) {
    let menu = this.find(id)
    if (menu === undefined) { return undefined }

    validateMenu(Object.assign({}, menu, params))
    Object.assign(menu, params)
    return menu
  }
}

module.exports = { Menu, MenuInvalidError }
