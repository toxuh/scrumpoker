import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Badge, Button, List } from 'antd';
import { DeleteOutlined, LinkOutlined } from '@ant-design/icons';

import AddStoryModal from './AddStoryModal';
import JiraListModal from '../JiraListModal/JiraListModal';
import Menu from './Menu';

import { JiraEpicType, StoryType } from '../../types';

import messages from './messages';

import './StoriesList.css';

type StoriesListProps = {
  allStories: StoryType[];
  activeStories: StoryType[];
  closedStories: StoryType[];
  handleAddStory: (story: { name: string; description: string }) => void;
  handleRemoveStory: (storyId: string) => void;
  isUserModerator: boolean;
  handleGetEpics: () => void;
  handleGetStories: (list: string[]) => void;
  epicsList: JiraEpicType[];
};

const StoriesList: React.FC<StoriesListProps> = ({
  allStories,
  activeStories,
  closedStories,
  handleAddStory,
  handleRemoveStory,
  isUserModerator,
  epicsList,
  handleGetStories,
  handleGetEpics,
}) => {
  const intl = useIntl();

  const [addModal, setAddModal] = useState(false);
  const [importModal, setImportModal] = useState(false);

  const [activeMenuItem, setActiveMenuItem] = useState('active');

  const getStoriesList = () => {
    if (activeMenuItem === 'active') {
      return activeStories;
    } else if (activeMenuItem === 'closed') {
      return closedStories;
    } else if (activeMenuItem === 'all') {
      return allStories;
    }
  };

  return (
    <div className="StoriesList">
      <Menu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        setAddModal={setAddModal}
        setImportModal={setImportModal}
        activeStoriesLength={activeStories.length}
        closedStoriesLength={closedStories.length}
        allStoriesLength={allStories.length}
        isUserModerator={isUserModerator}
        handleGetEpics={handleGetEpics}
        handleGetStories={handleGetStories}
        epicsList={epicsList}
      />
      {Boolean(allStories.length) ? (
        <List
          className="StoriesList__List"
          dataSource={getStoriesList()}
          locale={{ emptyText: intl.formatMessage(messages.noStories) }}
          renderItem={(story) => (
            <List.Item key={story._id}>
              <List.Item.Meta
                title={story.name}
                description={story.description}
              />
              {story.jiraKey && (
                <a
                  href={`https://marfateam.atlassian.net/browse/${story.jiraKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkOutlined />
                </a>
              )}
              {!story.isActive && (
                <>
                  {story.points ? (
                    <Badge
                      className="StoriesList__Points"
                      count={story.points}
                    />
                  ) : (
                    <span className="StoriesList__Skipped">
                      {intl.formatMessage(messages.skipped)}
                    </span>
                  )}
                </>
              )}
              {isUserModerator && activeMenuItem === 'active' && (
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                  onClick={() => handleRemoveStory(story._id)}
                />
              )}
            </List.Item>
          )}
        />
      ) : (
        <p className="StoriesList__NoStories">
          {intl.formatMessage(messages.noStories)}
        </p>
      )}
      <AddStoryModal
        toggleModal={setAddModal}
        handleAddStory={handleAddStory}
        showModal={addModal}
      />
      <JiraListModal
        showModal={importModal}
        toggleModal={setImportModal}
        list={epicsList}
        handleGetStories={handleGetStories}
      />
    </div>
  );
};

export default StoriesList;
