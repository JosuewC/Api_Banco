// routes/tipoCambio.js

const express = require('express');
const axios = require('axios');
const router = express.Router();


const API_KEY = 'db355770e55d8b6f341188ed';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// Ruta para obtener el tipo de cambio
router.get('/tipo-cambio', async (req, res) => {
  try {
    // La api hace la solicitud a la API para obtener los tipos de cambio en tiempo real
    const response = await axios.get(BASE_URL);

    
    const rates = response.data.conversion_rates;

    // Calculamos los tipos de cambio de compra y venta para el CRC
    const tipoDeCambioCompra = rates['CRC'] * 0.98; 
    const tipoDeCambioVenta = rates['CRC'] * 1.02; 
    res.json({
      compra: tipoDeCambioCompra,
      venta: tipoDeCambioVenta,
      monedaBase: 'USD',
      monedaDestino: 'CRC',  // Cambiado a colón costarricense
      timestamp: response.data.time_last_updated, 
    });
  } catch (error) {
    console.error('Error al obtener tipo de cambio:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el tipo de cambio en tiempo real' });
  }
});

module.exports = router;
