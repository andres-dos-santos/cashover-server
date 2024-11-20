import express from 'express';

import { companyController } from '../controllers/company.controller';

const companyRoutes = express.Router();

companyRoutes.post('/company', companyController.create);

companyRoutes.get('/company/:id', companyController.get);
companyRoutes.get('/companies', companyController.all);

export default companyRoutes;
