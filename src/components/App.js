import React from 'react';
import ClientsList from './client/ClientsList';
import Client from './client/Client';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

const client = {
  name: 'كشك العروبة',
  ownerName: 'محمد أحمد السوهاجي',
  location: { lng: 31.2832075, lat: 29.9723999 },
  image: 'url',
  phones: ['٠١١١٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'],
  address: '١٨ شارع النصر, المعادي, القاهرة',
};
const clients = [
  {
    name: 'Ahmed Ali',
    address: 'address 1',
  },
  {
    name: 'Mohamed Mohsen',
    address: 'address 2',
  },
  {
    name: 'Ahmed Samir',
    address: 'address 3',
  },
  {
    name: 'Mesho Essam',
    address: 'address 4',
  },
];

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Client client={client} />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
