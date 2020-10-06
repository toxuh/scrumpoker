import React from 'react';
import { shallow } from 'enzyme';

import AddStoryModal, { AddStoryModalProps } from './AddStoryModal';

const props: AddStoryModalProps = {
  handleAddStory: jest.fn(),
  showModal: true,
  toggleModal: jest.fn(),
};

describe('components/StoriesList/AddStoryModal', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<AddStoryModal {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Modal
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
                "defaultMessage": "Save and close",
                "id": "Room.TasksList.addOneStory",
              }
            </ForwardRef(InternalButton)>,
            <ForwardRef(InternalButton)
              block={false}
              ghost={false}
              htmlType="button"
              loading={false}
              onClick={[Function]}
              type="primary"
            >
              Object {
                "defaultMessage": "Save and add new",
                "id": "Room.TasksList.addManyStories",
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
                "id": "Room.TasksList.cancel",
              }
            </ForwardRef(InternalButton)>,
          ]
        }
        maskTransitionName="fade"
        okType="primary"
        onCancel={[Function]}
        title={
          Object {
            "defaultMessage": "New story",
            "id": "Room.TasksList.newStory",
          }
        }
        transitionName="zoom"
        visible={true}
        width={520}
      >
        <ForwardRef(InternalForm)
          layout="vertical"
        >
          <FormItem>
            <Input
              onChange={[Function]}
              placeholder={
                Object {
                  "defaultMessage": "Story title",
                  "id": "Room.TasksList.storyTitle",
                }
              }
              type="text"
              value=""
            />
          </FormItem>
          <FormItem>
            <TextArea
              onChange={[Function]}
              placeholder={
                Object {
                  "defaultMessage": "Story description",
                  "id": "Room.TasksList.storyDescription",
                }
              }
              value=""
            />
          </FormItem>
        </ForwardRef(InternalForm)>
      </Modal>
    `);
  });
});
