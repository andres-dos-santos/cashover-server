import express from 'express';

import { authenticationController } from '../controllers/authentication.controller';

const authenticationRoutes = express.Router();

authenticationRoutes.post('/sign-in', authenticationController.signIn);

export default authenticationRoutes;
