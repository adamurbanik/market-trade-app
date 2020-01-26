import requestAccountTypes from './requestAccountTypes';
import { requestAccountTypesData } from '../services/tradingService';

jest.mock('../services/tradingService');

describe('requestAccountTypes middleware', () => {
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
  });

  afterEach(() => jest.resetAllMocks());

  test('should request account types data', async () => {
    const serviceResponse = {
      ok: true,
      status: 200,
      json: () => ({
        fakeData
      })
    };

    requestAccountTypesData.mockImplementation(() =>
      Promise.resolve(serviceResponse)
    );

    await requestAccountTypes(fakeReq, fakeRes, next);

    expect(fakeRes.locals.accountTypes).toEqual({ fakeData });
    expect(next).toHaveBeenCalled();
    expect(sendStatusMock).toBeCalledTimes(0);
  });

  test('should return status error while request fails', async () => {
    const serviceResponse = {
      ok: false,
      status: 400
    };

    requestAccountTypesData.mockImplementation(() =>
      Promise.reject(serviceResponse)
    );

    await requestAccountTypes(fakeReq, fakeRes, next);

    expect(next).not.toHaveBeenCalled();
    expect(sendStatusMock).toHaveBeenCalledWith(serviceResponse.status);
  });
});
