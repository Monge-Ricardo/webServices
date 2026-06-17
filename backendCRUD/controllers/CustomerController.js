const Customer = require('../models/Customer');

// Obtener todos los clientes
exports.findAll = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes: ' + error.message });
  }
};

// Obtener un cliente por su id (personalizado, numérico)
exports.findById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID de búsqueda debe ser un número entero' });
    }
    const customer = await Customer.findOne({ id });
    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el cliente: ' + error.message });
  }
};

// Registrar un nuevo cliente
exports.create = async (req, res) => {
  try {
    const { id, name, age, moneySpent } = req.body;

    if (id === undefined || name === undefined || age === undefined || moneySpent === undefined) {
      return res.status(400).json({ error: 'Todos los campos (id, name, age, moneySpent) son requeridos' });
    }

    const customerId = Number(id);
    const customerAge = Number(age);
    const customerMoney = Number(moneySpent);

    if (isNaN(customerId) || !Number.isInteger(customerId)) {
      return res.status(400).json({ error: 'El ID debe ser un número entero' });
    }
    if (isNaN(customerAge) || !Number.isInteger(customerAge)) {
      return res.status(400).json({ error: 'La edad debe ser un número entero' });
    }
    if (isNaN(customerMoney)) {
      return res.status(400).json({ error: 'El dinero gastado debe ser un número válido' });
    }

    // Validar duplicados de ID único
    const existing = await Customer.findOne({ id: customerId });
    if (existing) {
      return res.status(400).json({ error: `El cliente con ID ${customerId} ya existe` });
    }

    const newCustomer = new Customer({
      id: customerId,
      name,
      age: customerAge,
      moneySpent: customerMoney
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el cliente: ' + error.message });
  }
};

// Actualizar un cliente existente por su id personalizado
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID debe ser un número entero' });
    }

    const { name, age, moneySpent } = req.body;
    const updateFields = {};

    if (name !== undefined) {
      updateFields.name = name;
    }
    if (age !== undefined) {
      const customerAge = Number(age);
      if (isNaN(customerAge) || !Number.isInteger(customerAge)) {
        return res.status(400).json({ error: 'La edad debe ser un número entero' });
      }
      updateFields.age = customerAge;
    }
    if (moneySpent !== undefined) {
      const customerMoney = Number(moneySpent);
      if (isNaN(customerMoney)) {
        return res.status(400).json({ error: 'El dinero gastado debe ser un número decimal válido' });
      }
      updateFields.moneySpent = customerMoney;
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Cliente no encontrado para actualizar' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente: ' + error.message });
  }
};

// Eliminar un cliente por su id personalizado
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID debe ser un número entero' });
    }

    const deletedCustomer = await Customer.findOneAndDelete({ id });
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Cliente no encontrado para eliminar' });
    }

    res.json({ message: 'Cliente eliminado correctamente', deleted: deletedCustomer });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente: ' + error.message });
  }
};
