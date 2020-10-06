import React from 'react';
import { shallow } from 'enzyme';

import Login, { LoginProps } from './Login';

const props: LoginProps = {
  handleCreateUser: jest.fn(),
};

describe('containers/Login/Login', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<Login {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Content
        className="Login"
      >
        <ForwardRef(InternalForm)
          layout="vertical"
        >
          <FormItem
            label="[object Object]:"
          >
            <Input
              onChange={[Function]}
              type="text"
            />
          </FormItem>
          <Button
            block={false}
            ghost={false}
            htmlType="button"
            loading={false}
            onClick={[Function]}
            type="primary"
          >
            <Component />
          </Button>
        </ForwardRef(InternalForm)>
      </Content>
    `);
  });
});
