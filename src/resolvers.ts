import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    users: async (_parent, _args, context) => {
      return context.prisma.user.findMany();
    },
    user: async (_parent, args, context) => {
      return context.prisma.user.findUnique({ where: { id: parseInt(args.id) } });
    },
    projects: async (_parent, _args, context) => {
      return context.prisma.project.findMany({
        include: {
          owner: true,
        },
      });
    },
    project: async (_parent, args, context) => {
      return context.prisma.project.findUnique({ where: { id: parseInt(args.id) } });
    },
    tasks: async (_parent, _args, context) => {
      return context.prisma.task.findMany({
        include: {
          project: true,
          assignee: true,
        },
      });
    },
    task: async (_parent, args, context) => {
      return context.prisma.task.findUnique({ where: { id: parseInt(args.id) } });
    },
    labels: async (_parent, _args, context) => {
      return context.prisma.label.findMany();
    },
    label: async (_parent, args, context) => {
      return context.prisma.label.findUnique({ where: { id: parseInt(args.id) } });
    },
  },
  Mutation: {
    createUser: async (_parent, args, context) => {
      return context.prisma.user.create({ data: args.input });
    },
    createProject: async (_parent, args, context) => {
      return context.prisma.project.create({
        data: {
          name: args.input.name,
          owner: { connect: { id: parseInt(args.input.ownerId) } },
        },
      });
    },
    createTask: async (_parent, args, context) => {
      const data: any = {
        title: args.input.title,
        project: { connect: { id: parseInt(args.input.projectId) } },
      };
      if (args.input.assigneeId) {
        data.assignee = { connect: { id: parseInt(args.input.assigneeId) } };
      }
      return context.prisma.task.create({ data });
    },
    createLabel: async (_parent, args, context) => {
      return context.prisma.label.create({ data: args.input });
    },
    updateUser: async (_parent, args, context) => {
      return context.prisma.user.update({
        where: { id: parseInt(args.id) },
        data: args.input,
      });
    },
    updateProject: async (_parent, args, context) => {
      return context.prisma.project.update({
        where: { id: parseInt(args.id) },
        data: args.input,
      });
    },
    updateTask: async (_parent, args, context) => {
      const data: any = { ...args.input };
      if (args.input.projectId) {
        data.project = { connect: { id: parseInt(args.input.projectId) } };
      }
      if (args.input.assigneeId) {
        data.assignee = { connect: { id: parseInt(args.input.assigneeId) } };
      }
      return context.prisma.task.update({
        where: { id: parseInt(args.id) },
        data,
      });
    },
    updateLabel: async (_parent, args, context) => {
      return context.prisma.label.update({
        where: { id: parseInt(args.id) },
        data: args.input,
      });
    },
    deleteUser: async (_parent, args, context) => {
      return context.prisma.user.delete({ where: { id: parseInt(args.id) } });
    },
    deleteProject: async (_parent, args, context) => {
      return context.prisma.project.delete({ where: { id: parseInt(args.id) } });
    },
    deleteTask: async (_parent, args, context) => {
      return context.prisma.task.delete({ where: { id: parseInt(args.id) } });
    },
    deleteLabel: async (_parent, args, context) => {
      return context.prisma.label.delete({ where: { id: parseInt(args.id) } });
    },
  },
};
