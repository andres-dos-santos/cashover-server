import dayjs from 'dayjs';

import { prisma } from '../db/prisma';

class GenerateRefreshTokenProvider {
  async execute(groupId: string) {
    const expiresIn = dayjs().add(15, 'seconds').unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: { groupId, expiresIn },
    });

    return generateRefreshToken;
  }
}

export const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
