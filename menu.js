// const menuSchema = {
//   id: 2,
//   name: "Bar",
//   vendorId: 1
// }

const MENUS = []
let menuID = 1;

class Menu {
  constructor(params) {
    this.id = params.id
    this.name = params.name
    this.vendorId = params.vendorId
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

    Object.assign(menu, params)
    return menu
  }
}

module.exports = Menu
