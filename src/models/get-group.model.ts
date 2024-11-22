import { prisma } from '../db/prisma';

export async function getGroup(name: string) {
  console.log('name', name);

  return await prisma.group.findUnique({
    where: { name },
  });
}
