const images = [
  {
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },

  {
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];
export const visits = [
  {
    salesName: 'أحمد محمد',
    date: '10.10.2018',
    target: 'بيع',
  },
  {
    salesName: 'طارق أحمد محمد',
    date: '09.10.2018',
    target: 'زيارة',
  },
  {
    salesName: 'محمود علي محمد',
    date: '10.10.2018',
    target: 'أضافة مكان جديد',
  },
  {
    salesName: 'أحمد علي عبدالسلام',
    date: '10.10.2018',
    target: 'أشراف',
  },
];
export let clients = [
  {
    id: 0,
    clientName: 'كشك العروبة',
    ownerName: 'محمد أحمد السوهاجي',
    location: { lng: '31.2832075', lat: '29.9723999' },
    image: 'url',
    contacts: ['٠١١٣٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'],
    images: images,
    address: '١٨ شارع النصر, المعادي, القاهرة',
    visits: visits,
    verified: true,
  },
  {
    id: 1,
    clientName: 'كشك الحمد',
    ownerName: 'احمد محسن',
    location: { long: '234.234', lat: '1432.234' },
    image: 'url',
    contacts: ['٠١١٣٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'],
    images: images,
    address: '١٨ شارع النصر, العباسيه, القاهرة',
    visits: visits,
    verified: false,
  },
  {
    id: 2,
    clientName: 'كشك عكها و ربك يفكها',
    ownerName: 'ابو سمره',
    location: { long: '234.234', lat: '1432.234' },
    image: 'url',
    contacts: ['٠١١٣٢٣٨٤٧٤٧٣', '٠٢٢٨٤٨٣٩٢٠'],
    images: images,
    address: '١٨ شارع البررم, المعادي, القاهرة',
    visits: visits,
    verified: true,
  },
];
