import { prisma } from '../db/prisma';

export async function getGroup(name: string) {
  return await prisma.group.findUnique({
    where: { name },
  });
}
