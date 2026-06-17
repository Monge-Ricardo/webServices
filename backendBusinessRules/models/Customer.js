class Customer {
  constructor({ id, name, age, moneySpent }) {
    this.id = Number(id);
    this.name = name;
    this.age = Number(age);
    this.moneySpent = Number(moneySpent);
  }

  // Regla de negocio: Si gasta más de 500, es VIP
  isVip() {
    return this.moneySpent > 500;
  }
}

module.exports = Customer;
