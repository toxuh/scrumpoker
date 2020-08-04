import React from 'react';

import { Login as LoginComponent } from '../../components';

import useLogin from './useLogin';

const Login = () => {
  const { regUser } = useLogin();

  return <LoginComponent handleCreateUser={regUser} />;
};

export default Login;
