const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { async } = require('rxjs');

const userSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    enum: ['Administrador', 'Líder de Equipe', 'Funcionário'],
    required: false,
  },
  team: {
    type: String,
    enum: ['Tecnologia', 'Marketing', 'Administrativo','Customer Success','Comercial'],
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  setorTratado: {
    type: String,
    required: true,
  },
  funcao: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Ativo', 'Inativo'],
    required: false,
  },
  nivel: {
    type: String,
    required: false,
    default: 'prata',
  },
});

// Criptografar senha do usuário

let senhaModificada = false;

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password') || (!senhaModificada && !user.isNew)) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  senhaModificada = false; // Resetar a flag para evitar criptografia adicional
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;