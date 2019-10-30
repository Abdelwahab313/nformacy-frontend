import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
