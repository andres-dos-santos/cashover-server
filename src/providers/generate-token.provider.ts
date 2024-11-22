import jwt from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(groupId: string) {
    const token = jwt.sign({}, process.env.TOKEN_HASH ?? '', {
      subject: groupId,
      expiresIn: '60s',
    });

    return token;
  }
}

export const generateTokenProvider = new GenerateTokenProvider();
