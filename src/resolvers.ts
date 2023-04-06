import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    todos: async (_parent, _args, context) => {
      return context.prisma.todo.findMany();
    },
    todo: async (_parent, args, context) => {
      return context.prisma.todo.findUnique({ where: { id: parseInt(args.id) } });
    },
  },
  Mutation: {
    createTodo: async (_parent, args, context) => {
      return context.prisma.todo.create({ data: args.input });
    },
    updateTodo: async (_parent, args, context) => {
      return context.prisma.todo.update({
        where: { id: parseInt(args.id) },
        data: args.input,
      });
    },
    deleteTodo: async (_parent, args, context) => {
      return context.prisma.todo.delete({ where: { id: parseInt(args.id) } });
    },
  },
};
