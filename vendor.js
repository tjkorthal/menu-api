// const vendorSchema = {
//   id: 1,
//   name: "Foo",
//   phone: "555-123-1234",
//   website: "example.com",
//   email: "tjkorthal@example.com"
// }

const VENDORS = []
let vendorID = 1;

class Vendor {
  constructor(params) {
    this.id = params.id
    this.name = params.name
    this.phone = params.phone
    this.website = params.website
    this.email = params.email
  }

  static all() {
    return VENDORS
  }

  static create(params) {
    let vendor = new Vendor(
      Object.assign(
        params,
        { id: vendorID++ }
      )
    )
    VENDORS.push(vendor)
    return vendor
  }

  static destroy(id) {
    let vendor = this.find(id)
    if (vendor === undefined) { return undefined }

    let index = VENDORS.indexOf(vendor)
    VENDORS.splice(index, 1)

    return vendor
  }

  static destroyAll() {
    return VENDORS.map(x => VENDORS.shift())
  }

  static find(id) {
    return VENDORS.find(vendor => vendor.id == id)
  }

  static update(id, params) {
    let vendor = this.find(id)
    if (vendor === undefined) { return undefined }

    Object.assign(vendor, params)
    return vendor
  }
}

module.exports = Vendor
