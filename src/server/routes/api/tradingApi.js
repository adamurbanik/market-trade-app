import { Router } from 'express';
import requestAccounts from '../../middleware/requestAccounts';
import requestAccountTypes from '../../middleware/requestAccountTypes';
import createAccountData from '../../middleware/createAccountData';

export default () => {
  const router = new Router();

  router.get(
    '/accounts/request',
    requestAccounts,
    requestAccountTypes,
    createAccountData
  );

  return router;
};
