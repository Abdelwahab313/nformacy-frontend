import { BACKEND_WEB_URL } from '../../defualtTestValues';
import { setToLocalStorage } from '../../helperFunctions';

import { getFakeService } from '../../factories/serviceFactory';

import { camelizeKeys, decamelizeKeys } from 'humps';
import { requestAsAdmin } from './requestHelper';

export const createServiceRequest = (request = {}) => {
  const newRequestParams = getFakeService(request);
  delete newRequestParams.id;
  return requestAsAdmin({
    method: 'POST',
    url: `${BACKEND_WEB_URL}/services/`,
    body: decamelizeKeys(newRequestParams),
  }).then((response) => {
    setToLocalStorage('createdServiceRequest', camelizeKeys(response.body));
  });
};