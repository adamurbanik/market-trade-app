import { getLogger } from 'log4js';
const log = getLogger();

const createAccountData = (req, res, next) => {
  try {
    const { accounts, accountTypes } = res.locals;

    const accountsData = accounts.map(account => {
      account.title = accountTypes.find(
        type => type.id === account.accountType
      ).title;
      account.currencyProfitLoss = `${account.currency} ${account.profitLoss}`;
      return account;
    });

    res.status(200).json({ accountsData });
  } catch (err) {
    log.error(`Incompatible account data type`);

    return res.sendStatus(500);
  }
};

export default createAccountData;
