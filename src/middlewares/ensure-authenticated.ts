import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    response.status(401).json({ message: 'Token is missing.' });
  }

  const [, token] = authToken!.split(' ');

  try {
    jwt.verify(token, process.env.TOKEN_HASH ?? '');

    next();
  } catch (error) {
    response.status(401).json({ message: 'Token invalid.' });
  }
}
