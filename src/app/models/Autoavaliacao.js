const mongoose = require('mongoose');

// Definição do esquema da coleção "avaliacoes"
const autoavaliacaoSchema = new mongoose.Schema({
  funcionario: {
    type: String,
    required: true,
  },
  mediaIndividual: {
    type: Number,
    required: true,
  },
  dataFormatada: {
    type: String,
    required: true,
  },
  notas: [
    { nome: String,
      requisito: String,
      avaliacao: String,
      nota: Number,
    }
  ]
});

// Criação do modelo "Autoavaliacao" com base no esquema definido
const Autoavaliacao = mongoose.model('Autoavaliacao', autoavaliacaoSchema);

// Exportação do modelo "Avaliacao"
module.exports = Autoavaliacao;