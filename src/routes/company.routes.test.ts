import { expect, test } from 'vitest';

test('deve retornar as empresas', async () => {
  const response = await fetch('http://localhost:3333/api/1/companies');

  expect(response.status).toBe(200);

  const data = await response.json();
});

test('deve criar uma empresa', async () => {
  const response = await fetch('http://localhost:3333/api/1/company', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Vix Express',
      doc: '20162440000152',
    }),
  });

  expect(response.status).toBe(201);

  const data = await response.json();
});
