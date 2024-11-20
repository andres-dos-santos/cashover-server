import express from 'express';

import { companyController } from '../controllers/company.controller';

const companyRoutes = express.Router();

companyRoutes.post('/company/create', companyController.create);
companyRoutes.get('/company/:id', companyController.get);

export default companyRoutes;
