const Presupuesto = require('../models/presupuesto');

module.exports = {
  Query: {
    obtenerRubros: async () => await Presupuesto.find(),
    obtenerRubro: async (_, { id }) => await Presupuesto.findById(id),
    obtenerSubrubros: async (_, { rubroId }) => {
      const rubro = await Presupuesto.findById(rubroId); // Busca el rubro por ID
      if (!rubro) {
        throw new Error('Rubro no encontrado');
      }
      return rubro.subRubros; // Devuelve los subrubros embebidos
    },
  },
  Mutation: {
    crearRubro: async (_, { tipo, presupuestoTotal }) => {
      const nuevoRubro = new Presupuesto({ tipo, presupuestoTotal, subRubros: [] });
      return await nuevoRubro.save();
    },
    agregarSubRubro: async (_, { rubroId, nombre, presupuestoTotal }) => {
      const rubro = await Presupuesto.findById(rubroId);
      if (!rubro) throw new Error('Rubro no encontrado');

      rubro.subRubros.push({ nombre, presupuestoTotal, presupuestoGastado: 0, alertas: [] });
      return await rubro.save();
    },
    actualizarSubRubro: async (_, { rubroId, subRubroId, presupuestoTotal, presupuestoGastado }) => {
      const rubro = await Presupuesto.findById(rubroId);
      if (!rubro) throw new Error('Rubro no encontrado');

      const subRubro = rubro.subRubros.id(subRubroId);
      if (!subRubro) throw new Error('SubRubro no encontrado');

      subRubro.presupuestoTotal = presupuestoTotal
      subRubro.presupuestoGastado = presupuestoGastado;
      if (presupuestoGastado > subRubro.presupuestoTotal * 0.9) {
        subRubro.alertas.push('Presupuesto casi agotado');
      }
      return await rubro.save();
    },
    eliminarSubRubro: async (_, { rubroId, subRubroId }) => {
      const rubro = await Presupuesto.findById(rubroId);
      if (!rubro) throw new Error('Rubro no encontrado');

      rubro.subRubros.id(subRubroId).deleteOne();
      return await rubro.save();
    },
    eliminarRubro: async (_, { rubroId }) => {
      //console.log(rubroId);
      const rubro = await Presupuesto.findById(rubroId);
      console.log(rubroId)
      if (!rubro) throw new Error('Rubro no encontrado');
    
      await Presupuesto.deleteOne({ _id: rubroId });

    
      // Devuelve el rubro eliminado
      return rubro;
    }
  }
}
