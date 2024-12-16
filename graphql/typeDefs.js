const { gql } = require('apollo-server-express');

module.exports = gql`
  """
  Tipo SubRubro: Representa un subrubro dentro de un rubro principal.
  """
  type SubRubro {
    id: ID!
    nombre: String!
    presupuestoTotal: Float!
    presupuestoGastado: Float!
    alertas: [String!]
  }

  """
  Tipo Rubro: Representa los rubros principales categorizados en ingresos, gastos e inversión, donde los gastos no deben superar los ingresos
  y la inversión es la diferencia de los ingresos menos los gastos.
  """
  type Rubro {
    id: ID!
    tipo: String!
    subRubros: [SubRubro!]!
  }

  """
  Consultas disponibles.
  """
  type Query {
    obtenerRubros: [Rubro!]!
    obtenerRubro(id: ID!): Rubro
    obtenerSubrubros(rubroId: ID!): [SubRubro!]!
  }

  """
  Mutaciones disponibles.
  """
  type Mutation {
    crearRubro(tipo: String!): Rubro
    agregarSubRubro(rubroId: ID!, nombre: String!, presupuestoTotal: Float!): Rubro
    actualizarSubRubro(rubroId: ID!, subRubroId: ID!, presupuestoTotal: Float!, presupuestoGastado: Float!): Rubro
    eliminarSubRubro(rubroId: ID!, subRubroId: ID!): Rubro
    eliminarRubro(rubroId: ID!): Rubro
  }
`;
