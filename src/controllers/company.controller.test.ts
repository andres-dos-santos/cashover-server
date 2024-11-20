import { beforeAll, expect, test } from 'vitest';
import * as uuid from 'uuid';

import { baseURL } from '../constants/base-url';

import { prisma } from '../db/prisma';

const company = {
  name: 'Vix Express',
  doc: '20162440000152',
};

async function createCompany() {
  const response = await fetch(baseURL + 'company', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company),
  });

  const data = await response.json();

  return { data, status: response.status };
}

async function getCompanies() {
  const response = await fetch(baseURL + 'companies');

  const data = await response.json();

  return { data, status: response.status };
}

beforeAll(async () => {
  await prisma.company.deleteMany();
});

test('deve criar uma empresa', async () => {
  const { data, status } = await createCompany();

  expect(status).toBe(201);
  expect(uuid.validate(data.id)).toBeTruthy();
});

test('deve dar erro ao tentar criar uma empresa', async () => {
  const { data, status } = await createCompany();

  expect(status).toBe(400);
  expect(data.message).toBe('This company already exists.');
});

test('deve buscar todas as empresas', async () => {
  const { data, status } = await getCompanies();

  expect(status).toBe(200);
  expect(data).toHaveLength(1);
});
