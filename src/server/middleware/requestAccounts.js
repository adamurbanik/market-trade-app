import * as tradingService from '../services/tradingService';
import { getLogger } from 'log4js';
const log = getLogger();

const requestAccounts = async (req, res, next) => {
  try {
    const response = await tradingService.requestAccountsData();
    const accounts = await response.json();

    res.locals.accounts = accounts;
    log.debug(`Accounts Data retrieved successfully ${response.status}`);

    return next();
  } catch (err) {
    const { status = 500, description = '', message = '' } = err;

    log.error(
      `Get accounts data failure ${status} ${description} message: ${message}`
    );
    return res.sendStatus(status);
  }
};

export default requestAccounts;
