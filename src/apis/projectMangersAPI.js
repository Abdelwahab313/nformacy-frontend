export const fetchProjectManagers = () => {
  const projectManagers = [
    {
      id: 1,
      referenceNumber: '1000109',
      firstName: 'Ahmed',
      lastName: 'Ayman',
      email: 'ahmed933@nformacy.com',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      assignedProjects: 4,
    },
    {
      id: 2,
      referenceNumber: '1000120',
      firstName: 'Jon',
      lastName: 'Micheal',
      email: 'jon@nformacy.com',
      fields: [
        {
          id: 1,
          majorFieldId: 3,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      assignedProjects: 9,
    },
    {
      id: 3,
      referenceNumber: '1000134',
      firstName: 'Erik',
      lastName: 'Erickson',
      email: 'erik@nformacy.com',
      fields: [
        {
          id: 1,
          majorFieldId: 5,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      assignedProjects: 19,
    },
    {
      id: 4,
      referenceNumber: '1000156',
      firstName: 'Sara',
      lastName: 'Edward',
      email: 'sara@outsourcing.com',
      fields: [
        {
          id: 1,
          majorFieldId: 4,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      assignedProjects: 8,
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: projectManagers });
  });
};
