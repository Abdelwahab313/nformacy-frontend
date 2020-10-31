export const fetchFields = jest.fn().mockResolvedValue({
  data: [
    {
      id: 1,
      label: 'Finance',
      fields: [
        { id: 30, label: 'Coaching' },
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
        { id: 39, label: 'Coaching' },
      ],
    },
    {
      id: 4,
      label: 'Accounting',
      fields: [
        { id: 40, label: 'Coaching' },
      ],
    },
    {
      id: 5,
      label: 'Development',
      fields: [
        { id: 58, label: 'Coaching' },
      ],
    },
  ],
});

