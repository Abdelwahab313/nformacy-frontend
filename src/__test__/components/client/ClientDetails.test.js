import React from "react";
import { mount } from "enzyme";
import { clients, visits } from "../../../data";
import ClientDetails from "../../../components/client/ClientDetails";

describe("Client Details", () => {
  it("should show table title", () => {
    const wrapper = mount(<ClientDetails client={clients[0]} />);
    expect(wrapper.find("#title").length).toEqual(1);
  });
  it("should show table content", () => {
    const wrapper = mount(<ClientDetails client={clients[0]} />);
    expect(wrapper.find("#clientName").length).toEqual(3);
    expect(wrapper.find("#ownerName").length).toEqual(3);
    expect(wrapper.find("#address").length).toEqual(3);
    expect(wrapper.find("#phones").length).toEqual(3);
  });
});
