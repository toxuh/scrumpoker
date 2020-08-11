import React from 'react';

import { Login as LoginComponent } from '../../components';

type LoginTypes = {
  handleCreateUser: (name: string) => void;
};

const Login = ({ handleCreateUser }: LoginTypes) => {
  return <LoginComponent handleCreateUser={handleCreateUser} />;
};

export default Login;
