import getConfig from 'next/config';

const { contextRoute } = getConfig().publicRuntimeConfig;

const config = {
  apiRoute: '/api',
  apiTrades: '/trades'
};

const apiRoutes = {
  requestAccounts: `${contextRoute}${config.apiRoute}${config.apiTrades}/accounts/request`
};

export { config as default, apiRoutes };
