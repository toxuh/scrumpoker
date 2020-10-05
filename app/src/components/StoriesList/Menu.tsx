import React from 'react';
import { useIntl } from 'react-intl';
import { Badge, Button, Col, Menu as AntMenu, Row } from 'antd';
import {
  ClockCircleOutlined,
  CloudDownloadOutlined,
  ExclamationCircleOutlined,
  IssuesCloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { JiraEpicType } from '../../types';

import messages from './messages';

import './Menu.css';

type MenuProps = {
  activeMenuItem: string;
  setActiveMenuItem: (key: string) => void;
  setAddModal: (opened: boolean) => void;
  setImportModal: (opened: boolean) => void;
  activeStoriesLength: number;
  closedStoriesLength: number;
  allStoriesLength: number;
  isUserModerator: boolean;
  handleGetEpics: () => void;
  handleGetStories: (list: string[]) => void;
  epicsList: JiraEpicType[];
};

const Menu: React.FC<MenuProps> = ({
  activeMenuItem,
  setActiveMenuItem,
  activeStoriesLength,
  closedStoriesLength,
  allStoriesLength,
  setAddModal,
  setImportModal,
  isUserModerator,
  handleGetEpics,
}) => {
  const intl = useIntl();

  return (
    <Row>
      <Col span={17}>
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
      <Col span={7} className="Menu__Buttons">
        {isUserModerator && (
          <>
            <Button
              className="AddStoryButton"
              type="link"
              icon={<PlusOutlined />}
              onClick={() => setAddModal(true)}
            >
              {intl.formatMessage(messages.addStory)}
            </Button>
            <Button
              className="ImportStoriesButton"
              type="link"
              icon={<CloudDownloadOutlined />}
              onClick={() => {
                handleGetEpics();
                setImportModal(true);
              }}
            >
              {intl.formatMessage(messages.importStories)}
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Menu;
