import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';

type LoginTypes = {
  handleCreateUser: () => void;
};

const Login = ({ handleCreateUser }: LoginTypes) => {
  const intl = useIntl();

  return (
    <>
      <h4>{intl.formatMessage(messages.typeYourName)}:</h4>
      <input type="text" />
      <button type="button" onClick={handleCreateUser}>
        {intl.formatMessage(messages.submit)}
      </button>
    </>
  );
};

export default Login;
