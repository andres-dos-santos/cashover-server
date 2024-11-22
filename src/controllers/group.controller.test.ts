import { expect, test } from 'bun:test';

import { baseURL } from '../constants/base-url';

const group = {
  name: 'Group 1',
  password: '123456',
};

async function createGroup() {
  return await fetch(baseURL + 'group', {
    method: 'POST',
    body: JSON.stringify(group),
  });
}

test('deve criar um novo grupo', async () => {
  const response = await createGroup();

  expect(response.status).toBe(201);
});
