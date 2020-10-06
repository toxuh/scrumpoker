import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('components/Loading/Loading', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<Loading />);

    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="Loading"
      >
        <Spin
          size="large"
          spinning={true}
          tip={
            Object {
              "defaultMessage": "Loading",
              "id": "Loading.loading",
            }
          }
          wrapperClassName=""
        />
      </div>
    `);
  });
});
