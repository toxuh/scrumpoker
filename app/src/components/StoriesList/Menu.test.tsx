import React from 'react';
import { shallow } from 'enzyme';

import Menu, { MenuProps } from './Menu';

const props: MenuProps = {
  activeMenuItem: 'active',
  setActiveMenuItem: jest.fn(),
  setAddModal: jest.fn(),
  setImportModal: jest.fn(),
  activeStoriesLength: 10,
  closedStoriesLength: 20,
  allStoriesLength: 30,
  isUserModerator: true,
  handleGetEpics: jest.fn(),
  handleGetStories: jest.fn(),
  epicsList: [],
};

describe('components/Loading', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<Menu {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Row>
        <Col
          span={17}
        >
          <Menu
            className="Menu"
            mode="horizontal"
            onClick={[Function]}
            selectedKeys={
              Array [
                "active",
              ]
            }
          >
            <MenuItem
              icon={<ForwardRef(ExclamationCircleOutlined) />}
              key="active"
            >
              <Component />
              <Badge
                count={10}
                showZero={true}
              />
            </MenuItem>
            <MenuItem
              icon={<ForwardRef(IssuesCloseOutlined) />}
              key="closed"
            >
              <Component />
              <Badge
                count={20}
                showZero={true}
              />
            </MenuItem>
            <MenuItem
              icon={<ForwardRef(ClockCircleOutlined) />}
              key="all"
            >
              <Component />
              <Badge
                count={30}
                showZero={true}
              />
            </MenuItem>
          </Menu>
        </Col>
        <Col
          className="Menu__Buttons"
          span={7}
        >
          <Button
            block={false}
            className="AddStoryButton"
            ghost={false}
            htmlType="button"
            icon={<ForwardRef(PlusOutlined) />}
            loading={false}
            onClick={[Function]}
            type="link"
          >
            <Component />
          </Button>
          <Button
            block={false}
            className="ImportStoriesButton"
            ghost={false}
            htmlType="button"
            icon={<ForwardRef(CloudDownloadOutlined) />}
            loading={false}
            onClick={[Function]}
            type="link"
          >
            <Component />
          </Button>
        </Col>
      </Row>
    `);
  });
});
