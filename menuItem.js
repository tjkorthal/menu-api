const MENU_ITEMS = []
let itemID = 1;

function all() {
  return MENU_ITEMS
}

function create(params) {
  let item = Object.assign(
    params,
    { id: itemID++ }
  )
  MENU_ITEMS.push(item)
  return item
}

function destroy(id) {
  let item = find(id)
  if (item === undefined) { return undefined }

  let index = MENU_ITEMS.indexOf(item)
  MENU_ITEMS.splice(index, 1)

  return item
}

function destroyAll() {
  return MENU_ITEMS.map(x => MENU_ITEMS.shift())
}

function find(id) {
  return MENU_ITEMS.find(item => item.id == id)
}

function update(id, params) {
  let item = find(id)
  if (item === undefined) { return undefined }

  Object.assign(item, params)
  return item
}

module.exports = {
  all,
  create,
  destroy,
  destroyAll,
  find,
  update
}
