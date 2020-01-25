import { Router } from 'express';
import bodyParser from 'body-parser';

const createApiRoutes = () => {
  const router = Router();

  router.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  router.use(bodyParser.json());

  return router;
};

export { createApiRoutes };
