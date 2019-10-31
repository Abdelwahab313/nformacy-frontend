import React from 'react';
import ClientsList from './client/ClientsList';

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
function App() {
  return <ClientsList clients={clients} />;
}

export default App;
