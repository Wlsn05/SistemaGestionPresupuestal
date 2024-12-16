const mongoose = require('mongoose');

const SubRubroSchema = new mongoose.Schema({
  nombre: String,
  presupuestoTotal: Number,
  presupuestoGastado: Number,
  alertas: [String]
});

const RubroSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['ingresos', 'gastos', 'inversion'],
    required: true
  },
  subRubros: [SubRubroSchema]
});

module.exports = mongoose.model('Presupuesto', RubroSchema);
