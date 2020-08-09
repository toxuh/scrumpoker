import React from 'react';
import { useIntl } from 'react-intl';
import { Button, Col, Row } from 'antd';
import {
  ClearOutlined,
  ForwardOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import messages from './messages';

import './Buttons.css';

const Buttons: React.FC = () => {
  const intl = useIntl();

  return (
    <Row className="Buttons">
      <Col span={8} className="Buttons__Col">
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.flipCards)}
          icon={<SyncOutlined />}
        />
      </Col>
      <Col span={8} className="Buttons__Col">
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.clearVotes)}
          icon={<ClearOutlined />}
        />
      </Col>
      <Col span={8} className="Buttons__Col">
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.skipStory)}
          icon={<ForwardOutlined />}
        />
      </Col>
    </Row>
  );
};

export default Buttons;
