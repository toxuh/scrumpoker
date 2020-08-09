import React, { Dispatch, SetStateAction } from 'react';

import { Login as LoginComponent } from '../../components';

import useLogin from './useLogin';

import { UserType } from '../../types';

type LoginTypes = {
  handleSetUser: Dispatch<SetStateAction<UserType>>;
};

const Login = ({ handleSetUser }: LoginTypes) => {
  const { createUser } = useLogin(handleSetUser);

  return <LoginComponent handleCreateUser={createUser} />;
};

export default Login;
