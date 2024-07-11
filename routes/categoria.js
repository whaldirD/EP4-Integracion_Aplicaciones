const express = require('express');
const router = express.Router();
const { categoria } = require('../models');

// Crear categoría
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const Categoria = await categoria.create({ nombre, descripcion });
    res.status(201).json(Categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener detalles de categoría
router.get('/:id', async (req, res) => {
  try {
    const Categoria = await categoria.findByPk(req.params.id);
    if (Categoria) {
      res.json(Categoria);
    } else {
      res.status(404).send('Categoria no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar categoría
router.put('/:id', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const Categoria = await categoria.findByPk(req.params.id);
    if (Categoria) {
      await Categoria.update({ nombre, descripcion });
      res.json(Categoria);
    } else {
      res.status(404).send('Categoria no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    const Categoria = await categoria.findByPk(req.params.id);
    if (Categoria) {
      await Categoria.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Categoria no encontrado');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;