// const itemSchema = {
//   id: 3,
//   menuId: 2,
//   name: "Tofu",
//   description: "Chewy soy",
//   price: 9.0
// }

const MENU_ITEMS = []
let itemID = 1;

class MenuItem {
  constructor(params) {
    this.id = params.id
    this.menuId = params.menuId
    this.name = params.name
    this.description = params.description
    this.price = params.price
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

    Object.assign(item, params)
    return item
  }
}

module.exports = MenuItem
