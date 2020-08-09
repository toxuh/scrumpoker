import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import AddStoryModal from './AddStoryModal';
import Menu from './Menu';

import { Story } from '../../../types';

import messages from './messages';

import './StoriesList.css';

type StoriesListProps = {
  stories: Story[];
  handleAddStory: (story: { name: string; description: string }) => void;
  handleRemoveStory: (storyId: string) => void;
};

const StoriesList: React.FC<StoriesListProps> = ({
  stories,
  handleAddStory,
  handleRemoveStory,
}) => {
  const intl = useIntl();

  const [showModal, toggleModal] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('active');

  return (
    <div className="StoriesList">
      <Menu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        toggleModal={toggleModal}
        activeStoriesLength={stories.filter((story) => story.isActive).length}
        closedStoriesLength={stories.filter((story) => !story.isActive).length}
        allStoriesLength={stories.length}
      />
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
