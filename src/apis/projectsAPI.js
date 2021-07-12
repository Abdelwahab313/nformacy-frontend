export const fetchProjects = () => {
  const projects = [
    {
      projectNumber: 1,
      title: 'Product Management',
      details:
        'an organisational function within a company dealing with new product development,etc...',
      duration: '14th Jun - 30th Dec',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'EG',
      consultants: 4,
      beneficiaries: 3,
    },
    {
      projectNumber: 2,
      title: 'Marketing Management',
      details:
        'organizational discipline which focuses on the practical application of marketing orientation',
      duration: '19th Jan - 20th Nov',
      fields: [
        {
          id: 2,
          majorFieldId: 2,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: '"Accounting"',
        },
      ],
      country: 'US',
      consultants: 4,
      beneficiaries: 3,
    },
    {
      projectNumber: 3,
      title: 'Content Calendar',
      details:
        'editorial calendar, or publishing schedule, is used by bloggers, publishers, businesses',
      duration: '14th Jun - 30th Dec',
      fields: [
        {
          id: 3,
          majorFieldId: 3,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Costing',
        },
      ],
      country: 'AT',
      consultants: 4,
      beneficiaries: 3,
    },
    {
      projectNumber: 4,
      title: 'Sales CRM',
      details:
        'tool for managing all touchpoints with prospects or customers throughout the sales process.',
      duration: '16th Feb - 30th Oct',
      fields: [
        {
          id: 4,
          majorFieldId: 4,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Coaching',
        },
      ],
      country: 'BS',
      consultants: 4,
      beneficiaries: 3,
    },
    {
      projectNumber: 5,
      title: 'Marketing Plan',
      details: 'art of an overall business plan.',
      duration: '16th Jan - 30th Oct',
      fields: [
        {
          id: 5,
          majorFieldId: 5,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'DE',
      consultants: 4,
      beneficiaries: 3,
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: projects });
  });
};
export const fetchConsultantsList = () => {
  const projects = [
    {
      firstName: 'Ahmed',
      lastName: 'Mohamed',
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
      checked: true,
    },
    {
      firstName: 'Abdelwahab',
      lastName: 'Mahmoud',
      fields: [
        {
          id: 2,
          majorFieldId: 2,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'EG',
      checked: false,
    },
    {
      firstName: 'Mahmoud',
      lastName: 'Ali',
      fields: [
        {
          id: 3,
          majorFieldId: 3,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'JO',
      checked: false,
    },
    {
      firstName: 'Aml',
      lastName: 'Moustafa',
      fields: [
        {
          id: 4,
          majorFieldId: 4,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'AL',
      checked: false,
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: projects });
  });
};
export const fetchBeneficiariesList = () => {
  const beneficiaries = [
    {
      firstName: 'Ahmed',
      lastName: 'Mohamed',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      country: 'IT',
      checked: true,
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: beneficiaries });
  });
};
export const fetchProjectConsultants = () => {
  const consultants = [
    {
      consultantRef: 1,
      firstName: 'ahmed',
      lastName: 'mohamed',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      numberOfProjects: 3,
    },
    {
      consultantRef: 2,
      firstName: 'ali',
      lastName: 'mstafa',
      fields: [
        {
          id: 2,
          majorFieldId: 2,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      numberOfProjects: 1,
    },
    {
      consultantRef: 3,
      firstName: 'Ahmed',
      lastName: 'Mohamed',
      fields: [
        {
          id: 3,
          majorFieldId: 3,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      numberOfProjects: 2,
    },
    {
      consultantRef: 4,
      firstName: 'Abdelwahab',
      lastName: 'Mahmoud',
      fields: [
        {
          id: 4,
          majorFieldId: 4,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      numberOfProjects: 1,
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: consultants });
  });
};
export const fetchProjectBeneficiaries = () => {
  const beneficiaries = [
    {
      beneficiaryRef: 1,
      firstName: 'ahmed',
      lastName: 'mohamed',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
    },
    {
      beneficiaryRef: 2,
      firstName: 'ali',
      lastName: 'mstafa',
      fields: [
        {
          id: 2,
          majorFieldId: 2,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
    },
    {
      beneficiaryRef: 3,
      firstName: 'Ahmed',
      lastName: 'Mohamed',
      fields: [
        {
          id: 3,
          majorFieldId: 3,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: beneficiaries });
  });
};
export const fetchProjectDetails = () => {
  const projects = [
    {
      projectNumber: 1,
      title: 'Product Management',
      details:
        'an organisational function within a company dealing with new product development,etc...',
      fields: [
        {
          id: 1,
          majorFieldId: 1,
          createdAt: '2021-05-06T16:03:27.130Z',
          updatedAt: '2021-05-06T16:03:27.189Z',
          label: 'Audit',
        },
      ],
      location: 'EG',
    },
  ];
  return new Promise((resolve) => {
    resolve({ data: projects });
  });
};
