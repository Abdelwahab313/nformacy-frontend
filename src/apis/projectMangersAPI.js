import axios from 'axios';
import { API_BASE_URL } from '../settings';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const fetchProjectManagers = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/users/project_managers`,
  }).then((response) => camelizeKeys(response));
};

const createProjectManager = (projectManager) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/users/create_user`,
    data: decamelizeKeys({ ...projectManager, role: 'projects_manager' }),
  }).then((response) => camelizeKeys(response));
};

const updateProjectManager = (projectManager) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/users/${projectManager.id}`,
    data: decamelizeKeys({ ...projectManager }),
  }).then((response) => camelizeKeys(response));
};

export const createOrUpdateProjectManager = (projectManager) => {
  if (!!projectManager.id) {
    return updateProjectManager(projectManager);
  } else {
    return createProjectManager(projectManager);
  }
};
