// const itemSchema = {
//   id: 3,
//   menuId: 2,
//   name: "Tofu",
//   description: "Chewy soy",
//   price: 9.0
// }

const MENU_ITEMS = []
let itemID = 1;

class MenuItemInvalidError extends Error {
  constructor(...params) {
    super(...params)
  }
}

function validateId(id) {
  if (id > 0) return

  throw new MenuItemInvalidError('ID must be present')
}

function validateMenuId(id) {
  if (id > 0) return

  throw new MenuItemInvalidError('ID must be present')
}

function validateName(name) {
  if (typeof name === 'string' && name.length >= 3) return

  throw new MenuItemInvalidError('Name must be at least 3 characters long')
}

function validatePrice(price) {
  if (price >= 0) return

  throw new MenuItemInvalidError('Price cannot be negative')
}

function validateMenuItem(vendor) {
  validateId(vendor.id)
  validateMenuId(vendor.menuId)
  validateName(vendor.name)
  validatePrice(vendor.price)
}

class MenuItem {
  constructor(params) {
    this.id = Number.parseInt(params.id)
    this.menuId = Number.parseInt(params.menuId)
    this.name = params.name
    this.description = params.description
    this.price = Number.parseFloat(params.price)
  }

  static all() {
    return MENU_ITEMS
  }

  static create(params) {
    let item = new MenuItem(
      Object.assign(
        params,
        { id: itemID++ }
      )
    )
    validateMenuItem(item)
    MENU_ITEMS.push(item)
    return item
  }

  static destroy(id) {
    let item = this.find(id)
    if (item === undefined) { return undefined }

    let index = MENU_ITEMS.indexOf(item)
    MENU_ITEMS.splice(index, 1)

    return item
  }

  static destroyAll() {
    return MENU_ITEMS.map(x => MENU_ITEMS.shift())
  }

  static find(id) {
    return MENU_ITEMS.find(item => item.id == id)
  }

  static update(id, params) {
    let item = this.find(id)
    if (item === undefined) { return undefined }

    validateMenuItem(Object.assign({}, item, params))
    Object.assign(item, params)
    return item
  }
}

module.exports = { MenuItem, MenuItemInvalidError }
