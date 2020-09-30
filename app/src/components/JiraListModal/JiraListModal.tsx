import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Checkbox, List, Modal, Spin } from 'antd';

import { JiraEpicType } from '../../types';

import messages from './messages';

type JiraListModalProps = {
  showModal: boolean;
  toggleModal: (opened: boolean) => void;
  list: JiraEpicType[];
  handleGetStories: (list: string[]) => void;
};

const JiraListModal: React.FC<JiraListModalProps> = ({
  showModal,
  toggleModal,
  list,
  handleGetStories,
}) => {
  const intl = useIntl();

  const [selected, setSelected] = useState<string[]>([]);

  const handleAddEpic = (key: string) => {
    setSelected([...selected, key]);
  };

  const handleRemoveEpic = (key: string) => {
    setSelected(selected.filter((item) => item !== key));
  };

  return (
    <Modal
      bodyStyle={{ height: '400px', overflow: 'auto' }}
      visible={showModal}
      title={intl.formatMessage(messages.header)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => handleGetStories(selected)}
        >
          {intl.formatMessage(messages.import)}
        </Button>,
        <Button key="cancel" onClick={() => toggleModal(false)}>
          {intl.formatMessage(messages.cancel)}
        </Button>,
      ]}
    >
      {Boolean(list.length) ? (
        <List
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    handleAddEpic(item.key);
                  } else {
                    handleRemoveEpic(item.key);
                  }
                }}
              >
                {item.name}
              </Checkbox>
            </List.Item>
          )}
        />
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default JiraListModal;
