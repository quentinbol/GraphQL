import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import mongoose from 'mongoose';
import { config } from './config/env.config';


async function startServer(): Promise<void> {
  const app = express();

  if (process.env.USE_MOCK_REPOSITORY === 'false')
    await mongoose.connect(config.dbUrl);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.listen(config.port, () => {
    console.log(`Server ready at http://localhost:${config.port}/graphql`);
    console.log(`GraphQL Sandbox at http://localhost:${config.port}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
