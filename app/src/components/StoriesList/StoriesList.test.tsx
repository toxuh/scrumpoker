import React from 'react';
import { shallow } from 'enzyme';

import StoriesList, { StoriesListProps } from './StoriesList';

const props: StoriesListProps = {
  allStories: [],
  activeStories: [],
  closedStories: [],
  handleAddStory: jest.fn(),
  handleRemoveStory: jest.fn(),
  isUserModerator: true,
  handleGetEpics: jest.fn(),
  handleGetStories: jest.fn(),
  epicsList: [],
};

describe('components/StoriesList/StoriesList', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<StoriesList {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="StoriesList"
      >
        <Menu
          activeMenuItem="active"
          activeStoriesLength={0}
          allStoriesLength={0}
          closedStoriesLength={0}
          epicsList={Array []}
          handleGetEpics={[MockFunction]}
          handleGetStories={[MockFunction]}
          isUserModerator={true}
          setActiveMenuItem={[Function]}
          setAddModal={[Function]}
          setImportModal={[Function]}
        />
        <p
          className="StoriesList__NoStories"
        >
          <Component />
        </p>
        <AddStoryModal
          handleAddStory={[MockFunction]}
          showModal={false}
          toggleModal={[Function]}
        />
        <JiraListModal
          handleGetStories={[MockFunction]}
          list={Array []}
          showModal={false}
          toggleModal={[Function]}
        />
      </div>
    `);
  });
});
