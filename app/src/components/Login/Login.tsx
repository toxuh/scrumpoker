import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';

type LoginTypes = {
  handleCreateUser: (name: string) => Promise<void>;
};

const Login = ({ handleCreateUser }: LoginTypes) => {
  const intl = useIntl();
  const [userName, setUserName] = useState('');

  return (
    <>
      <h4>{intl.formatMessage(messages.typeYourName)}:</h4>
      <input
        type="text"
        onChange={({ target: { value } }) => setUserName(value)}
      />
      <button type="button" onClick={() => handleCreateUser(userName)}>
        {intl.formatMessage(messages.submit)}
      </button>
    </>
  );
};

export default Login;
