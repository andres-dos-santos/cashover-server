import { prisma } from '../db/prisma';

export interface CreateCompanyDTO {
  doc: string;
  name: string;
}

export async function createCompany({ doc, name }: CreateCompanyDTO) {
  return await prisma.company.create({
    data: { doc, name },
    select: { id: true },
  });
}
