import React from 'react';
import { shallow } from 'enzyme';

import Main from './Main';

describe('<Main />', () => {
  it('should match the snapshot', () => {
    const container = shallow(<Main />);

    expect(container.html()).toMatchSnapshot();
  });
});
