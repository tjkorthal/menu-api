// const vendorSchema = {
//   id: 1,
//   name: "Foo",
//   phone: "555-123-1234",
//   website: "example.com",
//   email: "tjkorthal@example.com"
// }

const VENDORS = []
let vendorID = 1;

class VendorInvalidError extends Error {
  constructor(...params) {
    super(...params)
  }
}

function validateId(id) {
  if (id > 0) return

  throw new VendorInvalidError('ID must be present')
}

function validateName(name) {
  if (typeof name === 'string' && name.length >= 3) return

  throw new VendorInvalidError('Name must be at least 3 characters long')
}

function validatePhone(phone) {
  if (phone && phone.length >= 6) return

  throw new VendorInvalidError('Phone number is invalid')
}

function validateWebsite(website) {
  // website is optional
  if (!website) return
  if (typeof website === 'string' && website.endsWith('.com')) return

  throw new VendorInvalidError('Website is invalid')
}

function validateEmail(email) {
  if (typeof email === 'string' && email.includes('@')) return

  throw new VendorInvalidError('Email is invalid')
}

function validateVendor(vendor) {
  validateId(vendor.id)
  validateName(vendor.name)
  validatePhone(vendor.phone)
  validateWebsite(vendor.website)
  validateEmail(vendor.email)
}

class Vendor {
  constructor(params) {
    this.id = Number.parseInt(params.id)
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
    validateVendor(vendor)
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

    validateVendor(Object.assign({}, vendor, params))
    Object.assign(vendor, params)
    return vendor
  }
}

module.exports = { Vendor, VendorInvalidError }
