import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'user1password',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'user2password',
    },
  });

  // Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Project 1',
      owner: { connect: { id: user1.id } },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Project 2',
      owner: { connect: { id: user2.id } },
    },
  });

  // Tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Task 1',
      project: { connect: { id: project1.id } },
      assignee: { connect: { id: user1.id } },
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Task 2',
      project: { connect: { id: project2.id } },
      assignee: { connect: { id: user2.id } },
    },
  });

  // Labels
  const label1 = await prisma.label.create({
    data: {
      name: 'Label 1',
      tasks: { connect: { id: task1.id } },
    },
  });

  const label2 = await prisma.label.create({
    data: {
      name: 'Label 2',
      tasks: { connect: { id: task2.id } },
    },
  });

  console.log({ user1, user2, project1, project2, task1, task2, label1, label2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
