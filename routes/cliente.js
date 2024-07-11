const express = require('express');
const router = express.Router();
const { cliente } = require('../models');

// Crear cliente
router.post('/', async (req, res) => {
  const { nombre, correo, telefono, direccion } = req.body;
  try {
    const Cliente = await cliente.create({ nombre, correo, telefono, direccion });
    res.status(201).json(Cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de cliente
router.get('/:id', async (req, res) => {
    try {
      const Cliente = await cliente.findByPk(req.params.id);
      if (Cliente) {
        res.json(Cliente);
      } else {
        res.status(404).send('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Actualizar cliente
  router.put('/:id', async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;
    try {
      const Cliente  = await cliente.findByPk(req.params.id);
      if (Cliente) {
        await Cliente.update({ nombre, correo, telefono, direccion });
        res.json(Cliente);
      } else {
        res.status(404).send('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Eliminar cliente
  router.delete('/:id', async (req, res) => {
    try {
      const Cliente  = await cliente.findByPk(req.params.id);
      if (Cliente) {
        await Cliente.destroy();
        res.status(204).send();
      } else {
        res.status(404).send('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;