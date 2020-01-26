import { getLogger } from 'log4js';
import * as tradingService from '../services/tradingService';
const log = getLogger();

const requestAccountTypes = async (req, res, next) => {
  try {
    const response = await tradingService.requestAccountTypesData();
    const accountTypes = await response.json();

    res.locals.accountTypes = accountTypes;
    log.debug(`Account Types Data retrieved successfully ${response.status}`);

    next();
  } catch (err) {
    const { status = 500, description = '', message = '' } = err;

    log.error(
      `Get account types data failure ${status} ${description} message: ${message}`
    );
    return res.sendStatus(status);
  }
};

export default requestAccountTypes;
