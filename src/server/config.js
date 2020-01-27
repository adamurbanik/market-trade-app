type ServerConfig = {
  port: string,
  contextRoute: string,
  logLevel: string
};

const config: ServerConfig = {
  port: process.env.PORT || '3000',
  contextRoute: process.env.APP_CONTEXT_ROUTE || '',
  logLevel: process.env.LOG_LEVEL || ''
};

type RestdbConfig = {
  restdbIOHost: string,
  accountsEndpoint: string,
  accountTypesEndpoint: string
};

const restdbConfig: RestdbConfig = {
  restdbIOHost: process.env.RESTDB_IO_HOST,
  accountsEndpoint: process.env.ACCOUNTS_ENDPOINT,
  accountTypesEndpoint: process.env.ACCOUNT_TYPES_ENDPOINT
};

export { config as default, restdbConfig };
