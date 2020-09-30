import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Col, Form, InputNumber, Modal, Row } from 'antd';
import {
  CheckOutlined,
  ClearOutlined,
  ExclamationCircleOutlined,
  ForwardOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { JiraEpicType, StoryType } from '../../types';

import JiraListModal from '../JiraListModal/JiraListModal';

import messages from './messages';

import './Buttons.css';

type ButtonsProps = {
  activeStory?: StoryType;
  noVotes: boolean;
  storyPoints?: string;
  voteEnded: boolean;
  handleClearVotes: () => void;
  handleSkipStory: (taskId: string | undefined) => void;
  handleEndVoting: (sum: { taskId: string; points: number }) => void;
  summary: number;
  handleGetEpics: () => void;
  handleGetStories: (list: string[]) => void;
  epicsList: JiraEpicType[];
};

const { confirm } = Modal;

const Buttons: React.FC<ButtonsProps> = ({
  activeStory,
  noVotes,
  voteEnded,
  handleClearVotes,
  handleSkipStory,
  handleEndVoting,
  summary,
  handleGetEpics,
  handleGetStories,
  epicsList,
}) => {
  const intl = useIntl();

  const [jiraList, setJiraList] = useState(false);

  const [numInput, setNumInput] = useState(summary);

  useEffect(() => {
    if (summary && voteEnded) {
      setNumInput(summary);
    }
  }, [summary, voteEnded]);

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

  console.log(1);

  return (
    <Row className="Buttons">
      <Col className="Buttons__Col">
        <Form layout="inline">
          <Form.Item>
            <InputNumber
              value={voteEnded ? numInput : 0}
              size="large"
              disabled={!voteEnded}
              onChange={(e) => setNumInput(Number(e))}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              title={intl.formatMessage(messages.stopVoting)}
              icon={<CheckOutlined />}
              disabled={!voteEnded}
              onClick={() => {
                if (activeStory?._id) {
                  handleEndVoting({
                    taskId: activeStory?._id,
                    points: numInput,
                  });
                }
              }}
            >
              {intl.formatMessage(messages.stopVoting)}
            </Button>
          </Form.Item>
        </Form>
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
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handleGetEpics();
            setJiraList(true);
          }}
        >
          Get epics
        </Button>
      </Col>
      <JiraListModal
        showModal={jiraList}
        toggleModal={setJiraList}
        list={epicsList}
        handleGetStories={handleGetStories}
      />
    </Row>
  );
};

export default Buttons;
