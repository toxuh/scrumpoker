import React from 'react';
import { shallow } from 'enzyme';

import UsersList, { UsersListProps } from './UsersList';

const props: UsersListProps = {
  isUserModerator: true,
  users: [],
  votes: [],
  voteEnded: false,
};

describe('components/Loading', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<UsersList {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Fragment>
        <Title
          level={3}
        >
          <Component />
        </Title>
        <List
          className="UsersList"
          dataSource={Array []}
          renderItem={[Function]}
        />
        <Progress
          percent={NaN}
          showInfo={false}
          size="default"
          strokeLinecap="round"
          trailColor={null}
          type="line"
        />
      </Fragment>
    `);
  });
});
