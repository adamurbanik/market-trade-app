import restClient, { optionalHeaders } from '../lib/rest-client';

const requestAccountsData = () => {
  return restClient.get({
    url: `https://recruitmentdb-508d.restdb.io/rest/accounts`,
    headers: optionalHeaders
  });
};

const requestAccountTypesData = () => {
  return restClient.get({
    url: `https://recruitmentdb-508d.restdb.io/rest/accounttypes`,
    headers: optionalHeaders
  })

};

export { requestAccountsData, requestAccountTypesData };
