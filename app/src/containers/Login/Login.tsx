import React, { Dispatch, SetStateAction } from 'react';

import { Login as LoginComponent } from '../../components';

import useLogin from './useLogin';

type LoginTypes = {
  handleSetUserName: Dispatch<SetStateAction<string>>;
};

const Login = ({ handleSetUserName }: LoginTypes) => {
  const { createUser } = useLogin(handleSetUserName);

  return <LoginComponent handleCreateUser={createUser} />;
};

export default Login;
