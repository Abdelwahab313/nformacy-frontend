import React from 'react';
import { shallow } from 'enzyme';

describe.skip('Sidebar', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Drawer />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
