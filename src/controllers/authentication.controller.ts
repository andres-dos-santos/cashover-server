import type { Request, Response } from 'express';
import { compare } from 'bcrypt';

import { generateRefreshTokenProvider } from '../providers/generate-refresh-token.provider';

import { prisma } from '../db/prisma';
import { generateTokenProvider } from '../providers/generate-token.provider';

class Authentication {
  async signIn(request: Request, response: Response) {
    const { name, password } = request.body;

    const group = await prisma.group.findFirst({
      where: { name },
    });

    if (!group) throw new Error('Group name or password incorrect.');

    const passwordMatch = await compare(password, group.passwordHash);

    if (!passwordMatch) throw new Error('Group name or password incorrect.');

    const token = await generateTokenProvider.execute(group.id);
    const refreshToken = await generateRefreshTokenProvider.execute(group.id);

    response.status(201).json({ token, refreshToken });
  }
}

export const authenticationController = new Authentication();
