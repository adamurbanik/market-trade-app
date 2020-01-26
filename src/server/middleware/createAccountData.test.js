import createAccountData from './createAccountData';

describe('createAccountData middleware', () => {
  let sendStatusMock,
    fakeReq,
    fakeRes,
    next,
    fakeAccountData,
    fakeAccountTypesData;

  beforeAll(() => {
    fakeAccountData = [
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

    fakeAccountTypesData = [
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

    sendStatusMock = jest.fn();
    fakeReq = {};
    fakeRes = {
      locals: { accounts: fakeAccountData, accountTypes: fakeAccountTypesData },
      sendStatus: sendStatusMock,
      status: jest.fn(() => fakeRes),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should return 200 and with data in happy path', () => {
    const expectedValue = {
      accountsData: [
        {
          accountType: 'IGSB',
          currency: '$',
          currencyProfitLoss: '$ 0.23',
          funds: 10000,
          id: 1,
          name: 'Spread bet',
          profitLoss: 0.23,
          title: 'Spread bet account'
        },
        {
          accountType: 'IGSB',
          currency: '$',
          currencyProfitLoss: '$ -679',
          funds: 1000,
          id: 2,
          name: 'New Spread bet',
          profitLoss: -679,
          title: 'Spread bet account'
        },
        {
          accountType: 'IGSB',
          currency: '$',
          currencyProfitLoss: '$ 16.211',
          funds: 20000000,
          id: 3,
          name: 'Spread bet - demo',
          profitLoss: 16.211,
          title: 'Spread bet account'
        }
      ]
    };

    createAccountData(fakeReq, fakeRes, next);

    expect(fakeRes.status).toBeCalledWith(200);
    expect(fakeRes.json).toBeCalledWith(expectedValue);
  });

  test('should return 500 while data is invalid', () => {
    fakeRes.locals.accounts = fakeRes.locals.accounts.map((element, index) => {
      delete element['accountType'];
      return element;
    });

    createAccountData(fakeReq, fakeRes, next);

    expect(fakeRes.sendStatus).toBeCalledWith(500);
  });
});
