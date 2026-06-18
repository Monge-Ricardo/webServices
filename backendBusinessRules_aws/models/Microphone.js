class Microphone {
  constructor({ _id, serial, nameProduct, brand, model, material, yearDuration, new: isNew, price }) {
    this._id = _id;
    this.serial = Number(serial);
    this.nameProduct = nameProduct;
    this.brand = Number(brand);
    this.model = Number(model);
    this.material = material;
    this.yearDuration = Number(yearDuration);
    this.new = isNew;
    this.price = Number(price);
  }
}

module.exports = Microphone;
