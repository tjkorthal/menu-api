const VENDORS = []
let vendorID = 1;

function all() {
  return VENDORS
}

function create(params) {
  let vendor = {
    name: params.name,
    id: vendorID++
  }
  VENDORS.push(vendor)
  return vendor
}

function destroy(id) {
  let vendor = find(id)
  if (vendor === undefined) { return undefined }

  let index = VENDORS.indexOf(vendor)
  VENDORS.splice(index, 1)

  return vendor
}

function destroyAll() {
  return VENDORS.map(x => VENDORS.shift())
}

function find(id) {
  return VENDORS.find(vendor => vendor.id == id)
}

function update(id, params) {
  let vendor = find(id)
  if (vendor === undefined) { return undefined }

  vendor.name = params.name
  return vendor
}

module.exports = {
  all,
  create,
  destroy,
  destroyAll,
  find,
  update
}
