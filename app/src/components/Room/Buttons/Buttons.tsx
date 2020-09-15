import React from 'react';
import { useIntl } from 'react-intl';
import { Button, Col, Modal, Row } from 'antd';
import {
  CheckOutlined,
  ClearOutlined,
  ExclamationCircleOutlined,
  ForwardOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { StoryType } from '../../../types';

import messages from './messages';

import './Buttons.css';

type ButtonsProps = {
  activeStory?: StoryType;
  noVotes: boolean;
  storyPoints?: string;
  voteEnded: boolean;
  handleClearVotes: () => void;
  handleSkipStory: (taskId: string | undefined) => void;
};

const { confirm } = Modal;

const Buttons: React.FC<ButtonsProps> = ({
  activeStory,
  noVotes,
  voteEnded,
  handleClearVotes,
  handleSkipStory,
}) => {
  const intl = useIntl();

  const confirmConfig = {
    icon: <ExclamationCircleOutlined />,
    content: intl.formatMessage(messages.skipStoryConfirmHeader),
    okText: intl.formatMessage(messages.yes),
    cancelText: intl.formatMessage(messages.no),
    onOk() {
      handleSkipStory(activeStory?._id);
      handleClearVotes();
    },
  };

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
          onClick={handleClearVotes}
        >
          {intl.formatMessage(messages.clearVotes)}
        </Button>
        <Button
          type="primary"
          size="large"
          title={intl.formatMessage(messages.skipStory)}
          icon={<ForwardOutlined />}
          onClick={() => confirm(confirmConfig)}
        >
          {intl.formatMessage(messages.skipStory)}
        </Button>
      </Col>
    </Row>
  );
};

export default Buttons;
