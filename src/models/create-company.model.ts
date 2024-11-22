import { prisma } from '../db/prisma';

export interface CreateCompanyDTO {
  doc: string;
  name: string;
  description: string;
  groupId: string;
}

export async function createCompany({
  doc,
  name,
  description,
  groupId,
}: CreateCompanyDTO) {
  return await prisma.company.create({
    data: { doc, name, description, groupId },
    select: { id: true },
  });
}
