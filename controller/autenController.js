const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const Usuario = db.usuario; 
const jwtConfig = require('../config/jwtconfig');

exports.registrar = async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Usuario.create({ nombre, correo, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const token = jwt.sign({ id: user.id, correo: user.correo }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'No se proporciona token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token recibido:', token);

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no autenticado' });
    }

    req.userId = decoded.id;
    next();
  });
};

exports.getMe = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
