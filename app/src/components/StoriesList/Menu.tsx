import React from 'react';
import { useIntl } from 'react-intl';
import { Badge, Button, Col, Menu as AntMenu, Row } from 'antd';
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  IssuesCloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import messages from './messages';

import './Menu.css';

type MenuProps = {
  activeMenuItem: string;
  setActiveMenuItem: (key: string) => void;
  toggleModal: (opened: boolean) => void;
  activeStoriesLength: number;
  closedStoriesLength: number;
  allStoriesLength: number;
  isUserModerator: boolean;
};

const Menu: React.FC<MenuProps> = ({
  activeMenuItem,
  setActiveMenuItem,
  activeStoriesLength,
  closedStoriesLength,
  allStoriesLength,
  toggleModal,
  isUserModerator,
}) => {
  const intl = useIntl();

  return (
    <Row>
      <Col span={18}>
        <AntMenu
          className="Menu"
          mode="horizontal"
          selectedKeys={[activeMenuItem]}
          onClick={(e) => setActiveMenuItem(e.key as string)}
        >
          <AntMenu.Item key="active" icon={<ExclamationCircleOutlined />}>
            {intl.formatMessage(messages.activeStories)}
            <Badge count={activeStoriesLength} showZero />
          </AntMenu.Item>
          <AntMenu.Item key="closed" icon={<IssuesCloseOutlined />}>
            {intl.formatMessage(messages.closedStories)}
            <Badge count={closedStoriesLength} showZero />
          </AntMenu.Item>
          <AntMenu.Item key="all" icon={<ClockCircleOutlined />}>
            {intl.formatMessage(messages.allStories)}
            <Badge count={allStoriesLength} showZero />
          </AntMenu.Item>
        </AntMenu>
      </Col>
      <Col span={6}>
        {isUserModerator && (
          <Button
            className="AddStoryButton"
            type="link"
            icon={<PlusOutlined />}
            onClick={() => toggleModal(true)}
          >
            {intl.formatMessage(messages.addStory)}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Menu;
