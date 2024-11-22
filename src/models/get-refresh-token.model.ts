import { prisma } from '../db/prisma';

export async function getRefreshToken(id: string) {
  return await prisma.refreshToken.findFirst({
    where: { id },
  });
}
