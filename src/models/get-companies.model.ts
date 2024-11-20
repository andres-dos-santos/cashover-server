import { prisma } from '../db/prisma';

export async function getCompanies() {
  return await prisma.company.findMany();
}
