import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Client from './components/client/Client';
import * as serviceWorker from './serviceWorker';

const client = {
  name: 'كشك العروبة',
  ownerName: 'محمد أحمد السوهاجي',
  location: { long: '234.234', lat: '1432.234' },
  image: 'url',
  phones: ['٠١١١٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'],
  address: '١٨ شارع النصر, المعادي, القاهرة',
};

ReactDOM.render(<Client client={client} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
