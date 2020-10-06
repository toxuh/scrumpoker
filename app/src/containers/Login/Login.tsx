import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Button, Layout } from 'antd';

import messages from './messages';

import './Login.css';

export type LoginProps = {
  handleCreateUser: (name: string) => void;
};

const { Content } = Layout;

const Login = ({ handleCreateUser }: LoginProps) => {
  const intl = useIntl();
  const [userName, setUserName] = useState('');

  return (
    <Content className="Login">
      <Form layout="vertical">
        <Form.Item label={`${intl.formatMessage(messages.typeYourName)}:`}>
          <Input
            type="text"
            onChange={({ target: { value } }) => setUserName(value)}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => handleCreateUser(userName)}
        >
          {intl.formatMessage(messages.submit)}
        </Button>
      </Form>
    </Content>
  );
};

export default Login;
