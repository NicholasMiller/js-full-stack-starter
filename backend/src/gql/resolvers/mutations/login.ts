import jwt from 'jsonwebtoken';
import usersTable from '../../../database/tables/users-table';
import environment from '../../../environment';

interface LoginMutationInput {
  email: string;
  password: string;
}

type LoginResolver = (_: void, args: { input: LoginMutationInput }) => Promise<string>;

const resolver: LoginResolver = async (_, args) => {
  const { email, password } = args.input;

  const user = await usersTable.findOneByEmailAndPassword(email, password);

  if (!user) {
    return null;
  }

  return jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    environment().jwt.secret,
    {
      expiresIn: '1d',
      algorithm: 'HS256',
      subject: email,
    }
  );
};

export default {
  name: 'login',
  resolver,
};
