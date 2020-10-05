import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Checkbox, List, Modal } from 'antd';

import Loading from '../Loading/Loading';

import { JiraEpicType } from '../../types';

import messages from './messages';

import './JiraListModal.css';

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
      className="JiraListModal"
      visible={showModal}
      title={intl.formatMessage(messages.header)}
      onCancel={() => toggleModal(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            handleGetStories(selected);
            toggleModal(false);
          }}
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
        <Loading />
      )}
    </Modal>
  );
};

export default JiraListModal;
