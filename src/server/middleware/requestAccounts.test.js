import requestAccounts from './requestAccounts';
import { requestAccountsData } from '../services/tradingService';
import { not } from 'ramda';

jest.mock('../services/tradingService');

describe('requestAccounts middleware', () => {
  let sendStatusMock, fakeReq, fakeRes, next, fakeData;
  beforeAll(() => {
    sendStatusMock = jest.fn();
    fakeReq = {};
    fakeRes = {
      locals: {},
      sendStatus: sendStatusMock
    };
    next = jest.fn();
    fakeData = [
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
  });

  afterEach(() => jest.resetAllMocks());

  test('should request accounts data', async () => {
    const serviceResponse = {
      ok: true,
      status: 200,
      json: () => ({
        fakeData
      })
    };

    requestAccountsData.mockImplementation(() =>
      Promise.resolve(serviceResponse)
    );

    await requestAccounts(fakeReq, fakeRes, next);

    expect(fakeRes.locals.accounts).toEqual({ fakeData });
    expect(next).toHaveBeenCalled();
    expect(sendStatusMock).toBeCalledTimes(0);
  });

  test('should return status error while request fails', async () => {
    const serviceResponse = {
      ok: false,
      status: 400
    };

    requestAccountsData.mockImplementation(() =>
      Promise.reject(serviceResponse)
    );

    await requestAccounts(fakeReq, fakeRes, next);

    expect(next).not.toHaveBeenCalled();
    expect(sendStatusMock).toHaveBeenCalledWith(serviceResponse.status);
  });
});
