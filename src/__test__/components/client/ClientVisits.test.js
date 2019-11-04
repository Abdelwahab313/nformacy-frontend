import React from "react";
import { mount } from "enzyme";
import { visits } from "../../../data";
import ClientVisits from "../../../components/client/ClientVisits";

describe("Client Visits", () => {
  it("should show table title", () => {
    const wrapper = mount(<ClientVisits visits={visits}/>);
    expect(wrapper.find("#title").length).toEqual(1);
  });
});
