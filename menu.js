const MENUS = []
let menuID = 1;

function all() {
  return MENUS
}

function create(params) {
  let menu = {
    name: params.name,
    id: menuID++
  }
  MENUS.push(menu)
  return menu
}

function destroy(id) {
  let menu = find(id)
  if (menu === undefined) { return undefined }

  let index = MENUS.indexOf(menu)
  MENUS.splice(index, 1)

  return menu
}

function destroyAll() {
  return MENUS.map(x => MENUS.shift())
}

function find(id) {
  return MENUS.find(menu => menu.id == id)
}

function update(id, params) {
  let menu = find(id)
  if (menu === undefined) { return undefined }

  menu.name = params.name
  return menu
}

module.exports = {
  all,
  create,
  destroy,
  destroyAll,
  find,
  update
}
