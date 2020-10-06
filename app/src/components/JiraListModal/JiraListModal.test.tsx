import React from 'react';
import { shallow } from 'enzyme';

import JiraListModal, { JiraListModalProps } from './JiraListModal';

const props: JiraListModalProps = {
  showModal: true,
  toggleModal: jest.fn(),
  list: [],
  handleGetStories: jest.fn(),
};

describe('components/JiraListModal/JiraListModal', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<JiraListModal {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Modal
        className="JiraListModal"
        confirmLoading={false}
        footer={
          Array [
            <ForwardRef(InternalButton)
              block={false}
              ghost={false}
              htmlType="button"
              loading={false}
              onClick={[Function]}
              type="primary"
            >
              Object {
                "defaultMessage": "Import",
                "id": "Room.JiraListModal.import",
              }
            </ForwardRef(InternalButton)>,
            <ForwardRef(InternalButton)
              block={false}
              ghost={false}
              htmlType="button"
              loading={false}
              onClick={[Function]}
            >
              Object {
                "defaultMessage": "Cancel",
                "id": "Room.JiraListModal.cancel",
              }
            </ForwardRef(InternalButton)>,
          ]
        }
        maskTransitionName="fade"
        okType="primary"
        onCancel={[Function]}
        title={
          Object {
            "defaultMessage": "Import epics stories from JIRA",
            "id": "Room.JiraListModal.header",
          }
        }
        transitionName="zoom"
        visible={true}
        width={520}
      >
        <Loading />
      </Modal>
    `);
  });
});
