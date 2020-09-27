import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import AddStoryModal from './AddStoryModal';
import Menu from './Menu';

import { StoryType } from '../../types';

import messages from './messages';

import './StoriesList.css';

type StoriesListProps = {
  allStories: StoryType[];
  activeStories: StoryType[];
  closedStories: StoryType[];
  handleAddStory: (story: { name: string; description: string }) => void;
  handleRemoveStory: (storyId: string) => void;
};

const StoriesList: React.FC<StoriesListProps> = ({
  allStories,
  activeStories,
  closedStories,
  handleAddStory,
  handleRemoveStory,
}) => {
  const intl = useIntl();

  const [showModal, toggleModal] = useState(false);
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
        toggleModal={toggleModal}
        activeStoriesLength={activeStories.length}
        closedStoriesLength={closedStories.length}
        allStoriesLength={allStories.length}
      />
      {Boolean(allStories.length) ? (
        <List
          className="StoriesList__List"
          dataSource={getStoriesList()}
          renderItem={(story) => (
            <List.Item key={story._id}>
              <List.Item.Meta
                title={story.name}
                description={story.description}
              />
              {!story.isActive && (
                <span>
                  {story.points || intl.formatMessage(messages.skipped)}
                </span>
              )}
              <Button
                icon={<DeleteOutlined />}
                type="link"
                onClick={() => handleRemoveStory(story._id)}
              />
            </List.Item>
          )}
        />
      ) : (
        <p className="StoriesList__NoStories">
          {intl.formatMessage(messages.noStories)}
        </p>
      )}
      <AddStoryModal
        toggleModal={toggleModal}
        handleAddStory={handleAddStory}
        showModal={showModal}
      />
    </div>
  );
};

export default StoriesList;
