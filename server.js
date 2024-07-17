require('dotenv').config();
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const express = require('express');
const cors = require('cors');
const app = express(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./src/app/middleware/auth');
const bodyParser = require('body-parser');


app.use(cors());

const mongoose = require('mongoose');
const User = require('./src/app/models/User');

const MONGODB_URI = 'mongodb+srv://desenvolvimento:7CSJ5iTVgPxXeA1t@cluster0.wxdwjbm.mongodb.net/internuz'

const path = require('path');

// Conexão com banco de dados

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao banco MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco MongoDB', error);
  });

// Configuração do midddleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Esqueci a Senha
app.post('/api/auth/esqueci-senha', async (req, res) => {
  const { email } = req.body;

  try {
    // Verifique se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'E-mail não encontrado.' });
    }

    // Gerar token de redefinição de senha
    const resetToken = jwt.sign({ email }, 'seu-segredo', { expiresIn: '1h' });

    // Atualizar o modelo de usuário com o token e o tempo de expiração
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora de expiração
    await user.save();

    const mailerSend = new MailerSend({
      apiKey: process.env.API_KEY,
    });

    const sentFrom = new Sender('no-reply@internuz.com.br', 'Internuz - Nairuz Agência de Marketing e Tecnologia');
    const recipient = new Recipient(email, 'Your Client');

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([recipient])
      .setSubject('Redefinição de Senha')
      .setHtml(`
      <body style="margin: 0; padding: 0; padding-bottom: 20px; padding-left: 15px; background-image: url('https://i.imgur.com/YZqid8h.png'); background-size: contain; background-repeat: no-repeat; font-family: Poppins, Montserrat, sans-serif;">
        <div style="padding: 20px;">
          <h1 style="color: #fff; font-weight: 400; margin-bottom: 30px;">Olá, <strong>Funcionairuz!</strong></h1>
          <p style="color: #fff; font-size: 14px; margin-bottom: 20px;">Clique no botão abaixo para redefinir sua senha:</p>
          <p style="margin-bottom: 30px; width: max-content; font-size: 14px; font-weight: bold; color: darkblue !important; text-decoration: none;"><a href="http://internuz.com.br/redefinir-senha/${resetToken}" style="color: darkblue !important; border-radius: 25px; font-size: 14px; font-weight: 600; text-decoration: none;"><img src="https://i.imgur.com/d1idUeT.png" alt="Redefinir Senha" style="max-width: 200px;"></a></p>
          <p style="color: #fff; font-size: 10px;">*Por favor, não responda este e-mail.</p>
        </div>
      </body>
    `);

    

    await mailerSend.email
      .send(emailParams);

    res.status(200).json({ message: 'E-mail enviado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao solicitar redefinição de senha.' });
  }
});

app.post('/api/auth/redefinir-senha', async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    // Verifique se o token é válido
    const decodedToken = jwt.verify(token, 'seu-segredo');

    // Verifique se o token ainda é válido para redefinição de senha
    if (Date.now() > decodedToken.exp * 1000) {
      return res.status(400).json({ message: 'Token de redefinição de senha expirado.' });
    }

    // Encontre o usuário pelo e-mail no token
    const user = await User.findOne({ email: decodedToken.email });

    // Verifique se o usuário existe
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualize a senha do usuário
  user.password = await bcrypt.hash(novaSenha, 10);
  await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao redefinir a senha.' });
  }
});


// Importe o modelo de Avaliacao
const Avaliacao = require('./src/app/models/Avaliacao');

// Rota para salvar a avaliação
app.post('/api/avaliacao', async (req, res) => {
  const dadosAvaliacao = req.body; // Dados da avaliação enviados pelo Angular

  console.log('Notas recebidas:', dadosAvaliacao.notas);

  // Cria uma nova instância do modelo Avaliacao com os dados recebidos
  const novaAvaliacao = new Avaliacao({
    funcionario: dadosAvaliacao.funcionario,
    mediaIndividual: dadosAvaliacao.mediaIndividual,
    mediaTime: dadosAvaliacao.mediaTime,
    mediaEmpresa: dadosAvaliacao.mediaEmpresa,
    mediaFinalGeral: dadosAvaliacao.mediaFinalGeral,
    performance: dadosAvaliacao.performance,
    dataFormatada: dadosAvaliacao.dataFormatada,
    avaliador: dadosAvaliacao.avaliador,
    notas: dadosAvaliacao.notas // Adiciona as notas à avaliação
  });

  try {
    // Salva a nova avaliação no banco de dados
    await novaAvaliacao.save();
    res.status(200).json({ message: 'Avaliação salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar a avaliação:', error);
    res.status(500).json({ message: 'Erro ao salvar a avaliação' });
  }
});

app.get('/api/avaliacoes', async (req, res) => {
  const nomeUsuario = req.query.nomeUsuario; // Obtém o nome de usuário dos parâmetros da consulta

  try {
    // Consulta as avaliações filtrando pelo nome do usuário
    const avaliacoes = await Avaliacao.find({ funcionario: nomeUsuario });

    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error('Erro ao obter as avaliações:', error);
    res.status(500).json({ message: 'Erro ao obter as avaliações' });
  }
});

// Rota de Cadastro
app.post('/api/auth/cadastro', async (req, res) => {
  try {
    const { name, email, password, team, accessLevel, setor, setorTratado } = req.body;

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
      team,
      accessLevel,
      setor,
      setorTratado,
      status: 'Ativo',
      funcao: 'Não Atribuída'
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
      return res.status(400).json({ message: 'Usuário ou senha incorretos.' });
    }

    // Verifique se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
    }

    // Gerar token
    const token = jwt.sign({ userId: existingUser._id }, 'ef1c8080fd1db32bf420fac3bc22bc567b6c25d41d17eef10e3e4f54becc31aa');

    // Autenticação bem-sucedida
    const { name, team, accessLevel, setor, setorTratado, funcao } = existingUser;

    res.status(200).json({ message: 'Login bem-sucedido.', user: { name, email, team, accessLevel, setor, setorTratado, funcao }, token });
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
      funcao: req.user.accessLevel,
      setor: req.user.setor,
      setorTratado: req.user.setorTratado,
      funcao: req.user.funcao
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao obter as informações do usuário.' });
  }
});

// Rota para atualizar um usuário
app.put('/api/editar-usuario', async (req, res) => {
  try {
    const { _id, name, email, team, setorTratado, funcao, accessLevel, status } = req.body;

    // Encontre o usuário pelo ID
    const user = await User.findById(_id);

    // Se o usuário não existir, retorne um erro
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualize os dados do usuário
    user.name = name;
    user.email = email;
    user.team = team;
    user.setorTratado = setorTratado;
    user.funcao = funcao;
    user.accessLevel = accessLevel;
    user.status = status;

    // Salve as alterações no banco de dados
    await user.save();

    // Responda com os dados do usuário atualizados
    return res.json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

const Autoavaliacao = require('./src/app/models/Autoavaliacao');

// Rota para salvar a autoavaliação
app.post('/api/autoavaliacoes', async (req, res) => {
  const dadosAutoavaliacao = req.body; 

  const mediaIndividualFixa = 0;
  console.log('Autoavaliação recebida:', dadosAutoavaliacao);

  const novaAutoavaliacao = new Autoavaliacao({
    funcionario: dadosAutoavaliacao.funcionario,
    mediaIndividual: mediaIndividualFixa,
    dataFormatada: dadosAutoavaliacao.data,
    notas: dadosAutoavaliacao.notas,
  });

  try {
    // Salva a nova autoavaliação no banco de dados
    await novaAutoavaliacao.save();
    res.status(200).json({ message: 'Autoavaliação salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar a autoavaliação:', error);
    res.status(500).json({ message: 'Erro ao salvar a autoavaliação' });
  }
});

// Rota para obter a última autoavaliação de um funcionário específico
app.get('/api/autoavaliacoes', async (req, res) => {
  try {
      const { funcionario } = req.query;

      // Consulte a última autoavaliação do funcionário especificado
      const ultimaAutoAvaliacao = await Autoavaliacao.find({ funcionario })
          // .sort({ dataFormatada: -1 }) // Classifique por data em ordem decrescente para obter a última
          // .limit(1);

      if (!ultimaAutoAvaliacao) {
          return res.status(404).json({ message: 'Nenhuma autoavaliação encontrada para o funcionário especificado.' });
      }

      res.json(ultimaAutoAvaliacao);
  } catch (error) {
      console.error('Erro ao recuperar a última autoavaliação:', error);
      res.status(500).json({ message: 'Erro ao recuperar a última autoavaliação.' });
  }
});

const distFolder = path.join(process.cwd(), '/dist/nairuz');

app.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

app.use("*", function(req, resp) {
  resp.sendFile(__dirname + '/dist/nairuz/index.html');
});

// Inicialização do servidor
const port = process.env['PORT'] || 3000;
app.listen(port, () => {
  console.log(`Servidor express iniciado na porta ${port}`);
});