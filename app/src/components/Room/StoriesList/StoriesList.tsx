import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  List,
  Menu,
  Modal,
  Row,
  Typography,
} from 'antd';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  IssuesCloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { Story } from '../../../types';

import messages from './messages';

import './StoriesList.css';

type StoriesListProps = {
  stories: Story[];
  handleAddStory: (story: { name: string; description: string }) => void;
  handleRemoveStory: (storyId: string) => void;
};

const { Title } = Typography;

const StoriesList: React.FC<StoriesListProps> = ({
  stories,
  handleAddStory,
  handleRemoveStory,
}) => {
  const intl = useIntl();

  const [activeMenuItem, setActiveMenuItem] = useState('active');
  const [showModal, toggleModal] = useState(false);
  const [storyName, setStoryName] = useState('');
  const [storyDescription, setStoryDescription] = useState('');

  const onCancel = () => {
    setStoryName('');
    setStoryDescription('');
    toggleModal(false);
  };

  const onAddTask = () => {
    if (storyName.length) {
      handleAddStory({
        name: storyName,
        description: storyDescription,
      });
      setStoryName('');
      toggleModal(false);
    } else {
      onCancel();
    }
  };

  return (
    <div className="TasksList">
      <Row>
        <Col span={18}>
          <Menu
            className="TasksList__Menu"
            mode="horizontal"
            selectedKeys={[activeMenuItem]}
            onClick={(e) => setActiveMenuItem(e.key as string)}
          >
            <Menu.Item key="active" icon={<ExclamationCircleOutlined />}>
              {intl.formatMessage(messages.activeStories)}
              <Badge
                count={stories.filter((story) => story.isActive).length}
                showZero
              />
            </Menu.Item>
            <Menu.Item key="closed" icon={<IssuesCloseOutlined />}>
              {intl.formatMessage(messages.closedStories)}
              <Badge
                count={stories.filter((story) => !story.isActive).length}
                showZero
              />
            </Menu.Item>
            <Menu.Item key="all" icon={<ClockCircleOutlined />}>
              {intl.formatMessage(messages.allStories)}
              <Badge count={stories.length} showZero />
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={6}>
          <Button
            className="TasksList__Button"
            type="link"
            icon={<PlusOutlined />}
            onClick={() => toggleModal(true)}
          >
            {intl.formatMessage(messages.addStory)}
          </Button>
          <Modal
            visible={showModal}
            title={intl.formatMessage(messages.newStory)}
            onOk={onAddTask}
            onCancel={onCancel}
          >
            <Form layout="vertical">
              <Form.Item>
                <Input
                  value={storyName}
                  onChange={({ target: { value } }) => setStoryName(value)}
                  placeholder={intl.formatMessage(messages.storyTitle)}
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  value={storyDescription}
                  onChange={({ target: { value } }) =>
                    setStoryDescription(value)
                  }
                  placeholder={intl.formatMessage(messages.storyDescription)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      {Boolean(stories.length) ? (
        <List
          dataSource={stories}
          renderItem={(story) => (
            <List.Item key={story._id}>
              <List.Item.Meta
                title={story.name}
                description={story.description}
              />
              <Button
                icon={<DeleteOutlined />}
                type="link"
                onClick={() => handleRemoveStory(story._id)}
              />
            </List.Item>
          )}
        />
      ) : (
        <Title level={4}>{intl.formatMessage(messages.noStories)}</Title>
      )}
    </div>
  );
};

export default StoriesList;
