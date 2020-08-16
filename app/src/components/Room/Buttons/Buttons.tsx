import React from 'react';
import { useIntl } from 'react-intl';
import { Button, Col, Row } from 'antd';
import {
  CheckOutlined,
  ClearOutlined,
  ForwardOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import messages from './messages';

import './Buttons.css';

type ButtonsProps = {
  noVotes: boolean;
  storyPoints?: string;
  voteEnded: boolean;
};

const Buttons: React.FC<ButtonsProps> = ({ noVotes, voteEnded }) => {
  const intl = useIntl();

  return (
    <Row className="Buttons">
      <Col className="Buttons__Col">
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.flipCards)}
          icon={<CheckOutlined />}
          disabled={!voteEnded}
        >
          {intl.formatMessage(messages.stopVoting)}
        </Button>
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.flipCards)}
          icon={<SyncOutlined />}
        >
          {intl.formatMessage(messages.flipCards)}
        </Button>
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.clearVotes)}
          icon={<ClearOutlined />}
          disabled={!noVotes}
        >
          {intl.formatMessage(messages.clearVotes)}
        </Button>
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.skipStory)}
          icon={<ForwardOutlined />}
        >
          {intl.formatMessage(messages.skipStory)}
        </Button>
      </Col>
    </Row>
  );
};

export default Buttons;
