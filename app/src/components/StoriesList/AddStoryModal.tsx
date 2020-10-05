import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Input, Modal } from 'antd';

import messages from './messages';

type AddStoryModalProps = {
  showModal: boolean;
  handleAddStory: (story: { name: string; description: string }) => void;
  toggleModal: (opened: boolean) => void;
};

const AddStoryModal: React.FC<AddStoryModalProps> = ({
  handleAddStory,
  showModal,
  toggleModal,
}) => {
  const intl = useIntl();

  const [storyName, setStoryName] = useState('');
  const [storyDescription, setStoryDescription] = useState('');

  const onCancel = () => {
    setStoryName('');
    setStoryDescription('');
    toggleModal(false);
  };

  const onAddStory = (multiple: boolean) => {
    if (storyName.length) {
      handleAddStory({
        name: storyName,
        description: storyDescription,
      });
      setStoryName('');
      setStoryDescription('');
      if (!multiple) {
        toggleModal(false);
      }
    } else {
      onCancel();
    }
  };

  return (
    <Modal
      visible={showModal}
      title={intl.formatMessage(messages.newStory)}
      onCancel={onCancel}
      footer={[
        <Button
          key="submitOne"
          type="primary"
          onClick={() => onAddStory(false)}
        >
          {intl.formatMessage(messages.addOneStory)}
        </Button>,
        <Button
          key="submitMany"
          type="primary"
          onClick={() => onAddStory(true)}
        >
          {intl.formatMessage(messages.addManyStories)}
        </Button>,

        <Button key="cancel" onClick={onCancel}>
          {intl.formatMessage(messages.cancel)}
        </Button>,
      ]}
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
            onChange={({ target: { value } }) => setStoryDescription(value)}
            placeholder={intl.formatMessage(messages.storyDescription)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStoryModal;
