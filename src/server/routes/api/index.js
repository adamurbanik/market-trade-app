import { Router } from 'express';
import bodyParser from 'body-parser';
import tradingApi from "./tradingApi";

const createApiRoutes = () => {
  const router = Router();

  router.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  router.use(bodyParser.json());

  router.use('/trades', tradingApi());

  return router;
};

export { createApiRoutes };
