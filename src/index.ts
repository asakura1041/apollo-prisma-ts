import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
