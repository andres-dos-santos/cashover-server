import { beforeAll, expect, test, vitest } from 'vitest';
import * as uuid from 'uuid';

import { prisma } from '../db/prisma';

const company = {
  name: 'Vix Express',
  doc: '20162440000152',
};

async function createCompany() {
  const response = await fetch('http://localhost:3333/api/1/company', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company),
  });

  const data = await response.json();

  return { data, status: response.status };
}

beforeAll(async () => {
  await prisma.company.deleteMany();

  await createCompany();
});

async function getCompanies() {
  const response = await fetch('http://localhost:3333/api/1/companies');

  const data = await response.json();

  return { data, status: response.status };
}

test('deve dar erro ao tentar criar uma empresa', async () => {
  const { data, status } = await createCompany();

  expect(status).toBe(400);
  expect(data.message).toBe('This company already exists.');
});

test('deve buscar todas as empresas', async () => {
  const { data, status } = await getCompanies();

  expect(status).toBe(200);
  expect(data).toBe([
    {
      id: uuid.validate(data[0].id),
      ...company,
    },
  ]);
});
