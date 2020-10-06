import React from 'react';
import { shallow } from 'enzyme';

import Cardboard, { CardboardProps } from './Cardboard';

const props: CardboardProps = {
  currentStory: {
    _id: '123',
    name: 'Story Name',
    createdAt: new Date('1995-12-17T03:24:00'),
    description: 'Description',
    points: 0,
    isActive: true,
    isDeleted: false,
  },
  isActive: true,
  userVote: '3',
  onCardClick: jest.fn(),
};

describe('components/Cardboard', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<Cardboard {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="Cardboard"
      >
        <Title
          level={3}
        >
          Story Name
          <Popover
            className="CardBoard__StoryDescription"
            content="Description"
            mouseEnterDelay={0.1}
            mouseLeaveDelay={0.1}
            overlayStyle={Object {}}
            placement="top"
            transitionName="zoom-big"
            trigger="click"
          >
            <ForwardRef(InfoCircleOutlined) />
          </Popover>
        </Title>
        <div
          className="Cardboard__Holder"
        >
          <Row
            gutter={
              Array [
                16,
                16,
              ]
            }
          >
            <Col
              key="0"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                0
              </Card>
            </Col>
            <Col
              key="0.5"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                ½
              </Card>
            </Col>
            <Col
              key="1"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                1
              </Card>
            </Col>
            <Col
              key="2"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                2
              </Card>
            </Col>
            <Col
              key="3"
              span={6}
            >
              <Card
                className="Card active"
                hoverable={true}
                onClick={[Function]}
              >
                3
              </Card>
            </Col>
            <Col
              key="5"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                5
              </Card>
            </Col>
            <Col
              key="8"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                8
              </Card>
            </Col>
            <Col
              key="?"
              span={6}
            >
              <Card
                className="Card"
                hoverable={true}
                onClick={[Function]}
              >
                ?
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    `);
  });
});
