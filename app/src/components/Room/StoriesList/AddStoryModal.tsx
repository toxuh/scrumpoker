import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Modal } from 'antd';

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

  const onAddStory = () => {
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
    <Modal
      visible={showModal}
      title={intl.formatMessage(messages.newStory)}
      onOk={onAddStory}
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
            onChange={({ target: { value } }) => setStoryDescription(value)}
            placeholder={intl.formatMessage(messages.storyDescription)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStoryModal;
