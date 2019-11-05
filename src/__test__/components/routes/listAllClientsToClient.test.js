import React from "react";
import { shallow, mount } from "enzyme";
import ClientsList from "../../../components/client/ClientsList";
import { BrowserRouter as Router, Route, MemoryRouter } from "react-router-dom";
import App from "../../../components/App";
import Client from "../../../components/client/Client";

describe("test app routes", () => {
  it.skip("should redirect to client details page", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/clients/1"]}>
        <Route path={"clients/:id"} component={Client} />
      </MemoryRouter>,
    );
    expect(wrapper.find(Client)).toBe("clients");
  });
});
