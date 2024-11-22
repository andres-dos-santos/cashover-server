import express from 'express';

import { refreshTokenController } from '../controllers/refresh-token.controller';

const refreshTokenRoutes = express.Router();

refreshTokenRoutes.post('/refresh-token/:id', refreshTokenController.create);

export default refreshTokenRoutes;
