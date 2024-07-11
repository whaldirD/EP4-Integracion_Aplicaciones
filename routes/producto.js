const express = require('express');
const router = express.Router();
const { producto } = require('../models');

// Crear producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, stock, categoriaId } = req.body;
  try {
    const Producto = await producto.create({ nombre, descripcion, precio, stock, categoriaId });
    res.status(201).json(Producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de producto
router.get('/:id', async (req, res) => {
  try {
    const Producto = await producto.findByPk(req.params.id);
    if (Producto ) {
      res.json(Producto);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { nombre, descripcion, precio, stock, categoriaId } = req.body;
  try {
    const Producto  = await producto.findByPk(req.params.id);
    if (Producto ) {
      await Producto .update({ nombre, descripcion, precio, stock, categoriaId });
      res.json(Producto );
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const Producto  = await producto.findByPk(req.params.id);
    if (Producto) {
      await Producto.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;