import jwt from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(groupId: string) {
    const token = jwt.sign({}, process.env.TOKEN_HASH ?? '', {
      subject: groupId,
      expiresIn: process.env.NODE_ENV === 'development' ? '3600s' : '20s',
    });

    return token;
  }
}

export const generateTokenProvider = new GenerateTokenProvider();
