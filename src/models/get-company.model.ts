import { prisma } from '../db/prisma';

export interface GetCompanyDTO {
  id: string;
}

export async function getCompany({ id }: GetCompanyDTO) {
  return await prisma.company.findUnique({
    where: { id },
    select: { id: true, name: true, doc: true },
  });
}
