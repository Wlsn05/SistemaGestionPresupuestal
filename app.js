const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');

// Configuración del servidor principal
const iniciarServidor = async () => {

  // Conectar a la base de datos
  require('./config/database');
  //await conectarBaseDatos();

  // Configurar GraphQL
  const typeDefs = require('./graphql/typeDefs');
  const resolvers = require('./graphql/resolvers');
  const server = new ApolloServer({ typeDefs, resolvers });
  //await server.start();
  //server.applyMiddleware({ app });

  // Middleware de autenticación
  //const autenticacionJWT = require('./middlewares/authMiddleware');
  //app.use(autenticacionJWT);

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Servidor listo en ${url}`);
};

iniciarServidor();