import { prisma } from '../db/prisma';

export async function checksIfTheCompanyHasTheSameDocument(doc: string) {
  const company = await prisma.company.findUnique({
    where: { doc },
  });

  return !!company;
}
