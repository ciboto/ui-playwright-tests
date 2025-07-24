import { request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const userPath = path.resolve(__dirname, 'Data/user.json');

export async function registerUserViaAPI() {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    title: 'Mr',
    birth_date: '10',
    birth_month: '05',
    birth_year: '1990',
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'Canada',
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
    fullName: '' // adiciona fullName
  };

  user.fullName = `${user.firstname} ${user.lastname}`;

  const requestContext = await request.newContext();

  const response = await requestContext.post('https://automationexercise.com/api/createAccount', {
    form: user,
  });

  const body = await response.json();

  if (body.responseCode !== 201) {
    throw new Error(`❌ Falha ao criar usuário. Status: ${response.status()} - ${JSON.stringify(body)}`);
  }

  const userDir = path.dirname(userPath);
  if (!existsSync(userDir)) mkdirSync(userDir, { recursive: true });
  writeFileSync(userPath, JSON.stringify(user, null, 2));

  return user;
}
