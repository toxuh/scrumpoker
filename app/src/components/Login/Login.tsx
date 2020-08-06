import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Col, Form, Row } from 'react-bootstrap';

import messages from './messages';

type LoginTypes = {
  handleCreateUser: (name: string) => void;
};

const Login = ({ handleCreateUser }: LoginTypes) => {
  const intl = useIntl();
  const [userName, setUserName] = useState('');

  return (
    <Col>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>
              {intl.formatMessage(messages.typeYourName)}:
            </Form.Label>
            <Form.Control
              type="text"
              onChange={({ target: { value } }) => setUserName(value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={() => handleCreateUser(userName)}
          >
            {intl.formatMessage(messages.submit)}
          </Button>
        </Form>
      </Row>
    </Col>
  );
};

export default Login;
