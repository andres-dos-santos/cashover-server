import type { Request, Response } from 'express';

import { getRefreshToken } from '../models/get-refresh-token.model';
import { generateRefreshTokenProvider } from '../providers/generate-refresh-token.provider';

class RefreshToken {
  async create(request: Request, response: Response) {
    const { id } = request.params;

    const refreshToken = await getRefreshToken(id);

    if (!refreshToken) throw new Error('Refresh token invalid.');

    const token = await generateRefreshTokenProvider.execute(
      refreshToken.groupId
    );

    response.status(201).json({ token });
  }
}

export const refreshTokenController = new RefreshToken();
