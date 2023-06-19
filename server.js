const express = require('express');
const cors = require('cors');
const app = express(); 

app.use(cors());

const authRoutes = require('./src/app/routes/auth');

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

// Configuração de roteamento
app.use('/api/auth', authRoutes);

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
      password
    });

    // Salvar o novo usuário no banco de dados

    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o usuário.' });
  }
});