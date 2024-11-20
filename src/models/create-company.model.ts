import { prisma } from '../db/prisma';

export interface CreateCompanyDTO {
  doc: string;
  name: string;
  description: string;
}

export async function createCompany({
  doc,
  name,
  description,
}: CreateCompanyDTO) {
  return await prisma.company.create({
    data: { doc, name, description },
    select: { id: true },
  });
}
