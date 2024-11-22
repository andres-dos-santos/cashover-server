import { hash } from 'bcrypt';

import { prisma } from '../db/prisma';

export interface CreateGroupDTO {
  name: string;
  password: string;
}

export async function createGroup({ name, password }: CreateGroupDTO) {
  const passwordHash = await hash(password, 8);

  const shortName = name.slice(0, 2);

  const { id } = await prisma.group.create({
    data: {
      name,
      shortName,
      passwordHash,
    },
    select: { id: true },
  });

  return { id };
}
