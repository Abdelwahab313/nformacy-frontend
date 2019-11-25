import React from 'react';
import { shallow } from 'enzyme';
import SideBar from '../../../components/drawer/SideBar';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('div').length).toEqual(2);
  });
  it('should renders drawer ', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('#side-menu').length).toEqual(1);
  });
  it('should renders reps button ', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('#reps').length).toEqual(1);
  });
  it('should renders clients button ', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('#clients').length).toEqual(1);
  });
  it('should renders products button ', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('#products').length).toEqual(1);
  });
  it('should have three children of the drawer list', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('#menu-items').length).toEqual(1);
  });
});
