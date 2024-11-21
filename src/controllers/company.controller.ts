import type { Response, Request } from 'express';

import { z } from 'zod';

import { createCompany } from '../models/create-company.model';
import { getCompany } from '../models/get-company.model';
import { getCompanies } from '../models/get-companies.model';

import { checksIfTheCompanyHasTheSameDocument } from '../utils/checks-if-the-company-has-the-same-document';
import { handleValidationError } from '../utils/handle-validation-error';

const CreateCompanyRequest = z.object({
  name: z.string({ required_error: 'cannot be empty' }),
  description: z.string({ required_error: 'cannot be empty' }),
  doc: z
    .string()
    .length(14, '[doc] - must be a 14 numbers')
    .transform((doc, context) => {
      if (/\D/.test(doc)) {
        context.addIssue({
          message: 'must contain only numbers',
          code: 'custom',
        });
      }

      return doc;
    }),
});

class Company {
  async create(request: Request, response: Response) {
    const { success, data, error } = CreateCompanyRequest.safeParse(
      request.body
    );

    try {
      if (!success) {
        throw new Error(handleValidationError(error.errors));
      }

      const { doc, name, description } = data;

      const companyAlreadyExists = await checksIfTheCompanyHasTheSameDocument(
        doc
      );

      if (companyAlreadyExists) {
        throw new Error('This company already exists.');
      }

      const { id } = await createCompany({ name, doc, description });

      response.status(201).json({ id });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
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
