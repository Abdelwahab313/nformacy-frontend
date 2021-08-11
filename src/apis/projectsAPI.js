import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

const createProject = (project) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/projects`,
    data: decamelizeKeys({ ...project }),
  }).then((response) => camelizeKeys(response));
};

export const fetchProjects = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects`,
  }).then((response) => camelizeKeys(response));
};


export const submitProjectSettings = (projectSettings) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/project_settings`,
    data: decamelizeKeys({ ...projectSettings }),
  }).then((response) => camelizeKeys(response));
};

const updateProject = (project) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/projects/${project.id}`,
    data: decamelizeKeys({ ...project }),
  }).then((response) => camelizeKeys(response));
};

export const createOrUpdateProject = (project) => {
  if (!!project.id) {
    return updateProject(project);
  } else {
    return createProject(project);
  }
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

export const addConsultants = (projectId, consultantIds) => {
  return axios({
    method: 'post',
    data: decamelizeKeys({ consultantIds }),
    url: `${API_BASE_URL}/projects/${projectId}/add_consultants`,
  }).then((response) => camelizeKeys(response));
};

export const addBeneficiaries = (projectId, beneficiaryIds) => {
  return axios({
    method: 'post',
    data: decamelizeKeys({ beneficiaryIds }),
    url: `${API_BASE_URL}/projects/${projectId}/add_beneficiaries`,
  }).then((response) => camelizeKeys(response));
};

export const addMentors = (projectId, projectMentorsAttributes) => {
  return axios({
    method: 'post',
    data: decamelizeKeys({ projectMentorsAttributes }),
    url: `${API_BASE_URL}/projects/${projectId}/add_mentors`,
  }).then((response) => camelizeKeys(response));
};
