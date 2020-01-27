import nock from 'nock';
import request from 'supertest';
import { apiRoutes } from '../../../src/utils/config';
import { restdbConfig } from '../../../src/server/config';
import initServer from '../../support/server';

describe('/trades routes', () => {
  const { restdbIOHost, accountsEndpoint, accountTypesEndpoint } = restdbConfig;
  const accounts = [
    {
      id: 1,
      name: 'Spread bet',
      funds: 10000,
      profitLoss: 0.23,
      accountType: 'IGSB',
      currency: '$'
    },
    {
      id: 2,
      name: 'New Spread bet',
      funds: 1000,
      profitLoss: -679,
      accountType: 'IGSB',
      currency: '$'
    },
    {
      id: 3,
      name: 'Spread bet - demo',
      funds: 20000000,
      profitLoss: 16.211,
      accountType: 'IGSB',
      currency: '$'
    }
  ];

  const accountTypes = [
    {
      id: 'IGSB',
      title: 'Spread bet account'
    },
    { id: 'IGCFD', title: 'CFD account' },
    {
      id: 'IGSTK',
      title: 'Share dealing account'
    },
    {
      id: 'IGISA',
      title: 'Individual Savings Account'
    },
    { id: 'IGFX', title: 'Forex account' }
  ];

  const app = initServer();

  describe('/accounts/request route', () => {
    const accountsRequestRoute = `${apiRoutes.requestAccounts}`;

    test('should return 200 in a happy path', async () => {
      const expectedResponse = {
        accountsData: [
          {
            id: 1,
            name: 'Spread bet',
            funds: 10000,
            profitLoss: 0.23,
            accountType: 'IGSB',
            currency: '$',
            title: 'Spread bet account',
            currencyProfitLoss: '$ 0.23'
          },
          {
            id: 2,
            name: 'New Spread bet',
            funds: 1000,
            profitLoss: -679,
            accountType: 'IGSB',
            currency: '$',
            title: 'Spread bet account',
            currencyProfitLoss: '$ -679'
          },
          {
            id: 3,
            name: 'Spread bet - demo',
            funds: 20000000,
            profitLoss: 16.211,
            accountType: 'IGSB',
            currency: '$',
            title: 'Spread bet account',
            currencyProfitLoss: '$ 16.211'
          }
        ]
      };

      nock(restdbIOHost)
        .get(accountsEndpoint)
        .reply(200, accounts);

      nock(restdbIOHost)
        .get(accountTypesEndpoint)
        .reply(200, accountTypes);

      const res = await request(app).get(accountsRequestRoute);

      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toMatchObject(expectedResponse);
    });

    test('should return error status while external api responds with 400', async () => {
      const response = {
        httpStatusCode: 400,
        description: 'error occured'
      };

      nock(restdbIOHost)
        .get(accountsEndpoint)
        .reply(200, accounts);

      nock(restdbIOHost)
        .get(accountTypesEndpoint)
        .reply(400, response);

      const res = await request(app).get(accountsRequestRoute);

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('text/plain');
      expect(res.body).toStrictEqual({})
    });

    test('should return error status while external api responds with wrong data', async () => {
      const response = {
        httpStatusCode: 400,
        description: 'error occured'
      };

      nock(restdbIOHost)
        .get(accountsEndpoint)
        .reply(200, accounts);

      nock(restdbIOHost)
        .get(accountTypesEndpoint)
        .reply(200, { data: 'some-data' });

      const res = await request(app).get(accountsRequestRoute);

      expect(res.statusCode).toBe(500);
      expect(res.type).toBe('text/plain');
      expect(res.body).toStrictEqual({})
    });
  });
});
