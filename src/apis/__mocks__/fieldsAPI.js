export const fetchFields = jest.fn().mockResolvedValue({
  data: [
    {
      id: 1,
      label: 'Finance',
      fields: [
        { id: 36, label: 'Coaching' },
      ],
    },
    {
      id: 2,
      label: 'Marketing',
      fields: [
        { id: 34, label: 'Development Programs Design' },
        { id: 35, label: 'Development Programs Delivery' },
        { id: 36, label: 'Coaching' },
      ],
    },
    {
      id: 3,
      label: 'FinTech',
      fields: [
        { id: 36, label: 'Coaching' },
      ],
    },
    {
      id: 4,
      label: 'Accounting',
      fields: [],
    },
  ],
});

