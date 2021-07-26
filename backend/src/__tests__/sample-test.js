import faker from 'faker';
import usersTable from '../database/tables/users-table';

describe('sample test suite', () => {
  test('boom', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await usersTable.insert({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profilePhotoUrl: faker.internet.avatar(),
      email,
      password,
    });

    console.log(await usersTable.findOneByEmail(email));
  });

  test('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  });
});
