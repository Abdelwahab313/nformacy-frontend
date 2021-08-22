import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchProjects = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects`,
  }).then((response) => camelizeKeys(response));
};

const createProject = (project) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/projects`,
    data: decamelizeKeys({ ...project }),
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

export const fetchProjectConsultants = (projectId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects/${projectId}/consultants`,
  }).then((response) => camelizeKeys(response));
};

export const fetchProjectBeneficiaries = (projectId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects/${projectId}/beneficiaries`,
  }).then((response) => camelizeKeys(response));
};

export const fetchProjectServices = (projectId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects/${projectId}/services`,
  }).then((response) => camelizeKeys(response));
};

export const fetchProjectMentors = (projectId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects/${projectId}/mentors`,
  }).then((response) => camelizeKeys(response));
};

export const fetchProjectSettings = (projectId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/project_settings/${projectId}`,
  }).then((response) => camelizeKeys(response));
};

const createProjectSettings = (projectSettings) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/project_settings`,
    data: decamelizeKeys({ ...projectSettings }),
  }).then((response) => camelizeKeys(response));
};

const updateProjectSettings = (projectSettings) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/project_settings/${projectSettings.id}`,
    data: decamelizeKeys({ ...projectSettings }),
  }).then((response) => camelizeKeys(response));
};

export const submitProjectSettings = (projectSettings) => {
  if (!!projectSettings.id) {
    return updateProjectSettings(projectSettings);
  } else {
    return createProjectSettings(projectSettings);
  }
};

export const fetchProjectDetails = (projectId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/projects/${projectId}`,
  }).then((response) => camelizeKeys(response));
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
