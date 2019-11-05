import React from "react";
import { mount } from "enzyme";
import Client from "../../../components/client/Client";
import { clients } from "../../../data";

describe.skip("Client", () => {
  it("should show client details", () => {
    const myModule = require("react-router-dom");
    myModule.useParams = jest.fn();
    const wrapper = mount(<Client client={client} />);
    expect(wrapper.find("#clientDetails").length).toEqual(1);
  });
  it("should show clients images", () => {
    const wrapper = mount(<Client client={client} />);
    expect(wrapper.find("#clientImages").length).toEqual(1);
  });
  it("should show client visits", () => {
    const wrapper = mount(<Client client={client} />);
    expect(wrapper.find("#clientVisits").length).toEqual(1);
  });
  it("should show client map", () => {
    const wrapper = mount(<Client client={client} />);
    expect(wrapper.find("#clientMap").length).toEqual(1);
  });
});
