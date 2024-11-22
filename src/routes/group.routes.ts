import express from 'express';

import { groupController } from '../controllers/group.controller';

const groupRoutes = express.Router();

groupRoutes.post('/group', groupController.create);

export default groupRoutes;
