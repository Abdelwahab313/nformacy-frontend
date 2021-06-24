export const fetchProjects = () => {
  const projects = [
    {
      projectNumber: 1,
      title: 'project1',
      details: 'project 1 details',
      duration: '18:00 - 19:00',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'US',
      consultants: 2,
      beneficiaries: 3,
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: projects });
  });
};
export const fetchProjectConsultants = () => {
  const consultants = [
    {
      consultantRef: 1,
      firstName: 'ahmed',
      lastName: 'mohamed',
    },
    {
      consultantRef: 2,
      firstName: 'ali',
      lastName: 'mstafa',
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: consultants });
  });
};
