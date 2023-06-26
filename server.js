const express = require('express');
const cors = require('cors');
const app = express(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./src/app/middleware/auth');

app.use(cors());

const mongoose = require('mongoose');
const User = require('./src/app/models/User');

const MONGODB_URI = 'mongodb+srv://desenvolvimento:7CSJ5iTVgPxXeA1t@cluster0.wxdwjbm.mongodb.net/internuz'
// Conexão com banco de dados

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Conectado ao banco MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco MongoDB', error);
  });

// Configuração do midddleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Inicialização do servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor express iniciado na porta ${port}`);
});

// Rota de Cadastro
app.post('/api/auth/cadastro', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifique se o usuário já existe no banco de dados

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Crie um novo usuário com os dados fornecidos

    const newUser = new User({
      name,
      email,
      password,
    });

    // Salvar o novo usuário no banco de dados

    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o usuário.' });
  }
});

// Rota de Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifique se o usuário existe no banco de dados
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Verifique se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Gerar token
    const token = jwt.sign({ userId: existingUser._id }, 'ef1c8080fd1db32bf420fac3bc22bc567b6c25d41d17eef10e3e4f54becc31aa');

    // Autenticação bem-sucedida
    const { name } = existingUser;

    res.status(200).json({ message: 'Login bem-sucedido.', user: { name }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro durante o login.' });
  }
});


// Rota para obter todos os usuários
app.get('/api/users', async (req, res) => {
  try {
    // Obtenha todos os usuários do banco de dados
    const users = await User.find();

    // Retorne a lista de usuários como resposta
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao obter os usuários.' });
  }
});

// Rota para obter informações do usuário logado
app.get('/api/users/me', authMiddleware, async (req, res) => {
  try {

    // Verifique se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Obtenha as informações do usuário logado
    const userInfo = {
      name: req.user.name,
      email: req.user.email,
      time: req.user.team,
      funcao: req.user.accessLevel
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao obter as informações do usuário.' });
  }
});

