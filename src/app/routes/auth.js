const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Rota de registro de usuário
router.post('/cadastro', async (req, res) => {
  const {email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({message: 'E-mail já cadastrado'});
    }

    const user = new User ({ email, name, password });
    await user.save();

    res.status(201).json({message: 'Usuário cadastrado com sucesso'});
  } catch (error) {
    res.status(500).json({message: 'Erro ao cadastrar usuário'});
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'E-mail ou senha inválidos'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Email ou senha inválidos'});
    }

    const token = jwt.sign({ userId: user._id}, 'chave-secreta-do-jwt');

    res.json({token});
  } catch (error) {
    res.status(500).json({message: 'Erro ao realizar login'});
  }
})

module.exports = router;