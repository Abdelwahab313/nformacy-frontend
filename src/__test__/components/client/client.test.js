import React from 'react';
import { shallow } from 'enzyme';
import Client from '../../../components/client/Client';

const client = {
  name: 'كشك العروبة',
  ownerName: 'محمد أحمد السوهاجي',
  location: { long: '234.234', lat: '1432.234' },
  image: 'url',
  phones: ['٠١١١٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'],
  address: '١٨ شارع النصر, المعادي, القاهرة',
};
describe('show all clients', () => {
  it('make sure clients table exist', () => {
    const wrapper = shallow(<Client client={client} />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
