import type { Response, Request, NextFunction } from 'express';

import { createCompany } from '../models/create-company.model';
import { getCompany } from '../models/get-company.model';
import { getCompanies } from '../models/get-companies.model';
import { checksIfTheCompanyHasTheSameDocument } from '../utils/checks-if-the-company-has-the-same-document';

class Company {
  async create(request: Request, response: Response) {
    const { name, doc } = request.body;

    try {
      const { id } = await createCompany({ name, doc });

      const sameDocument = await checksIfTheCompanyHasTheSameDocument(doc);

      if (sameDocument) {
        response.status(400).json({ message: 'This company already exists.' });
      }

      response.status(201).json({ id });
    } catch (error) {
      response.status(400).json({ message: 'Unable to create a new company.' });
    }
  }

  async get(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const company = await getCompany({ id });

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

  async all(_: Request, response: Response) {
    try {
      const companies = await getCompanies();

      if (!companies) {
        response.status(400).json({ message: 'Unable to find companies.' });
      }

      response.json(companies);
    } catch (error) {
      response.status(400).json({ message: 'Something went wrong.' });
    }
  }
}

export const companyController = new Company();
