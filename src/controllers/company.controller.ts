import type { Response, Request, NextFunction } from 'express';

import { createCompany } from '../models/create-company.model';
import { getCompanyById } from '../models/get-company-by-id.model';

class Company {
  async create(request: Request, response: Response) {
    const { name, doc } = request.body;

    try {
      const { id } = await createCompany({ name, doc });

      response.status(201).json({ id });
    } catch (error) {
      response.status(400).json({ message: 'Unable to create a new company.' });
    }
  }

  async get(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    try {
      const company = await getCompanyById({ id });

      if (!company) {
        response
          .status(400)
          .json({ message: 'Unable to find company with this ID.' });
      }

      response.json(company);
    } catch (error) {
      response.status(400).json({ message: 'Something went wrong.' });
    }
  }
}

export const companyController = new Company();
