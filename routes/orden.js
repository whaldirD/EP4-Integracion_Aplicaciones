const express = require('express');
const router = express.Router();
const { orden } = require('../models');

// Crear producto
router.post('/', async (req, res) => {
  const { clienteId, total, estado } = req.body;
  try {
    const Orden = await orden.create({ clienteId, total, estado });
    res.status(201).json(Orden);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de orden
router.get('/:id', async (req, res) => {
  try {
    const Orden = await orden.findByPk(req.params.id);
    if (Orden) {
      res.json(Orden);
    } else {
      res.status(404).send('Orden no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar orden
router.put('/:id', async (req, res) => {
  const { clienteId, total, estado } = req.body;
  try {
    const Orden  = await orden.findByPk(req.params.id);
    if (Orden ) {
      await Orden.update({ clienteId, total, estado });
      res.json(Orden);
    } else {
      res.status(404).send('Orden no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar orden
router.delete('/:id', async (req, res) => {
  try {
    const Orden  = await orden.findByPk(req.params.id);
    if (Orden) {
      await Orden.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Orden no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;