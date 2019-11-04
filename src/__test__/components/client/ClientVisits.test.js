import React from "react";
import { mount } from "enzyme";
import { visits } from "../../../data";
import ClientVisits from "../../../components/client/ClientVisits";

describe("Client Visits", () => {
  it("should show table title", () => {
    const wrapper = mount(<ClientVisits visits={visits}/>);
    expect(wrapper.find("#title").length).toEqual(1);
  });
  it("should show table header", () => {
    const wrapper = mount(<ClientVisits visits={visits}/>);
    expect(wrapper.find("#salesNameHeader").length).toEqual(3);
    expect(wrapper.find("#dateHeader").length).toEqual(3);
    expect(wrapper.find("#targetHeader").length).toEqual(3);
  });

  it("should show table rows", () => {
    const wrapper = mount(<ClientVisits visits={visits}/>);
    expect(wrapper.find("#visitsDetails-0").length).toEqual(3);
    expect(wrapper.find("#visitsDetails-1").length).toEqual(3);
    expect(wrapper.find("#visitsDetails-2").length).toEqual(3);
  });
});
