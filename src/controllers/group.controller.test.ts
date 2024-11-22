import { beforeAll, expect, test } from 'bun:test';
import * as uuid from 'uuid';

import { baseURL } from '../constants/base-url';
import { prisma } from '../db/prisma';

const group = {
  name: 'Group 1',
  password: '123456',
};

async function createGroup() {
  return await fetch(baseURL + 'group', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group),
  });
}

beforeAll(async () => {
  await prisma.group.deleteMany();
});

test('deve criar um novo grupo', async () => {
  const response = await createGroup();

  expect(response.status).toBe(201);

  const data = await response.json();

  expect(uuid.validate(data.id)).toBeTruthy();
});

test('deve falhar ao criar um novo grupo', async () => {
  const response = await createGroup();

  expect(response.status).toBe(400);
});
