import restClient, { optionalHeaders } from '../lib/rest-client';
import { restdbConfig } from '../config';
const { restdbIOHost, accountsEndpoint, accountTypesEndpoint } = restdbConfig;

const requestAccountsData = () => {
  return restClient.get({
    url: `${restdbIOHost}${accountsEndpoint}`,
    headers: optionalHeaders
  });
};

const requestAccountTypesData = () => {
  return restClient.get({
    url: `${restdbIOHost}${accountTypesEndpoint}`,
    headers: optionalHeaders
  });
};

export { requestAccountsData, requestAccountTypesData };
