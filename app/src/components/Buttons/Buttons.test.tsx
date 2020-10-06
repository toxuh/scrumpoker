import React from 'react';
import { shallow } from 'enzyme';

import Buttons, { ButtonsProps } from './Buttons';

const props: ButtonsProps = {
  activeStory: {
    _id: '123',
    name: 'Story Name',
    createdAt: new Date('1995-12-17T03:24:00'),
    description: 'Description',
    points: 0,
    isActive: true,
    isDeleted: false,
  },
  noVotes: true,
  voteEnded: false,
  handleClearVotes: jest.fn(),
  handleSkipStory: jest.fn(),
  handleEndVoting: jest.fn(),
  summary: 0,
};

describe('components/Buttons', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<Buttons {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Row
        className="Buttons"
      >
        <Col
          className="Buttons__Col"
        >
          <ForwardRef(InternalForm)
            layout="inline"
          >
            <FormItem>
              <ForwardRef
                disabled={true}
                onChange={[Function]}
                size="large"
                step={1}
                value={0}
              />
            </FormItem>
            <FormItem>
              <Button
                block={false}
                disabled={true}
                ghost={false}
                htmlType="button"
                icon={<ForwardRef(CheckOutlined) />}
                loading={false}
                onClick={[Function]}
                size="large"
                title={
                  Object {
                    "defaultMessage": "Next story",
                    "id": "Room.Buttons.stopVoting",
                  }
                }
                type="primary"
              >
                <Component />
              </Button>
            </FormItem>
          </ForwardRef(InternalForm)>
          <Button
            block={false}
            ghost={false}
            htmlType="button"
            icon={<ForwardRef(SyncOutlined) />}
            loading={false}
            size="large"
            title={
              Object {
                "defaultMessage": "Flip cards",
                "id": "Room.Buttons.flipCards",
              }
            }
            type="primary"
          >
            <Component />
          </Button>
          <Button
            block={false}
            disabled={false}
            ghost={false}
            htmlType="button"
            icon={<ForwardRef(ClearOutlined) />}
            loading={false}
            onClick={[MockFunction]}
            size="large"
            title={
              Object {
                "defaultMessage": "Clear votes",
                "id": "Room.Buttons.clearVotes",
              }
            }
            type="primary"
          >
            <Component />
          </Button>
          <Button
            block={false}
            ghost={false}
            htmlType="button"
            icon={<ForwardRef(ForwardOutlined) />}
            loading={false}
            onClick={[Function]}
            size="large"
            title={
              Object {
                "defaultMessage": "Skip story",
                "id": "Room.Buttons.skipStory",
              }
            }
            type="primary"
          >
            <Component />
          </Button>
        </Col>
      </Row>
    `);
  });
});
