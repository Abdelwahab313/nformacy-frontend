import React from "react";
import { shallow } from "enzyme";
import Client from "../../../components/client/Client";
import {client} from "../../../data";

describe("show all clients", () => {
  it("make sure clients table exist", () => {
    const wrapper = shallow(<Client client={client} />);
    expect(wrapper.find("div").length).toEqual(2);
  });
});
