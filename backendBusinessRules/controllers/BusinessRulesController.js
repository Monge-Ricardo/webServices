const axios = require('axios');
const Customer = require('../models/Customer');

const CRUD_SERVICE_URL = process.env.CRUD_SERVICE_URL || 'http://localhost:4001/computerstore/customer';

// Obtener todos los clientes VIP
exports.findVips = async (req, res) => {
  try {
    // Consumir el servicio backendCRUD
    const response = await axios.get(CRUD_SERVICE_URL);
    const rawCustomers = response.data;

    // Mapear a modelos de Customer y filtrar
    const vips = rawCustomers
      .map(c => new Customer(c))
      .filter(c => c.isVip());

    res.json(vips);
  } catch (error) {
    console.error('Error in findVips:', error.message);
    res.status(500).json({ error: 'Error al evaluar la regla de negocio (VIPs): ' + error.message });
  }
};

// Verificar si un cliente específico es VIP por su ID
exports.checkVipById = async (req, res) => {
  try {
    const id = req.params.id;
    // Consumir el servicio backendCRUD para buscar por ID
    const response = await axios.get(`${CRUD_SERVICE_URL}/${id}`);
    const rawCustomer = response.data;

    if (!rawCustomer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const customer = new Customer(rawCustomer);

    res.json({
      id: customer.id,
      name: customer.name,
      moneySpent: customer.moneySpent,
      isVip: customer.isVip()
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    console.error('Error in checkVipById:', error.message);
    res.status(500).json({ error: 'Error al evaluar el cliente: ' + error.message });
  }
};
