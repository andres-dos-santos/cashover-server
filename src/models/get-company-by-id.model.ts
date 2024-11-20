import { prisma } from '../db/prisma';

export interface GetCompanyByIDDTO {
  id: string;
}

export async function getCompanyById({ id }: GetCompanyByIDDTO) {
  const company = await prisma.company.findUnique({
    where: { id },
    select: { id: true, name: true, doc: true },
  });

  return company;
}
