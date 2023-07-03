const mongoose = require('mongoose');

// Definição do esquema da coleção "avaliacoes"
const AvaliacaoSchema = new mongoose.Schema({
  funcionario: {
    type: String,
    required: true,
  },
  mediaFinal: {
    type: Number,
    required: true,
  },
  performance: {
    type: String,
    required: false,
  },
  dataAvaliacao: {
    type: String,
    required: true,
  },
  avaliador: {
    type: String,
    required: true,
  },
  notas: [
    { nome: String,
      nota: Number,
    }
  ]
});

// Criação do modelo "Avaliacao" com base no esquema definido
const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);

// Exportação do modelo "Avaliacao"
module.exports = Avaliacao;