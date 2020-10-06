import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-intl', () => ({
  defineMessages: jest.fn((messages) => messages),
  useIntl: () => ({
    formatMessage: jest.fn((message) => message),
  }),
}));
