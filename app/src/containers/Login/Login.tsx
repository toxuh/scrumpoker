import React, { Dispatch, SetStateAction } from 'react';

import { Login as LoginComponent } from '../../components';

import useLogin from './useLogin';

import { UserResponseType } from '../../types';

type LoginTypes = {
  handleSetUser: Dispatch<SetStateAction<UserResponseType>>;
};

const Login = ({ handleSetUser }: LoginTypes) => {
  const { createUser } = useLogin(handleSetUser);

  return <LoginComponent handleCreateUser={createUser} />;
};

export default Login;
