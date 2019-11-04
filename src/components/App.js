import React from "react";
import ClientsList from "./client/ClientsList";
import Client from "./client/Client";
import { StylesProvider } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { create } from "jss";
import preset from "jss-preset-default";
import rtl from "jss-rtl";
import {client, visits, clients} from "../data";


const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });


const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Client client={client} visits={visits}/>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
