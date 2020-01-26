import fetch from 'node-fetch';
import { getLogger } from 'log4js';
import { mergeDeepRight } from 'ramda'
import isomorphicRest from '../../lib/restClient/isomorphic-fetch';

const log = getLogger();

export const defaultHeaders = {
  'Content-Type': 'application/json',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
};

export const optionalHeaders = {
  'x-apikey': '5d9f48133cbe87164d4bb12c'
};

export const handleSuccessfulRequest = res => {
  if (res.ok) {
    return Promise.resolve(res);
  }

  return res
    .json()
    .then(err => Promise.reject({ ...err, status: res.status }))
    .catch(err => Promise.reject({ ...err, status: res.status }));
};

export const handleFailingRequest = err => {
  throw err;
};

const request = method => (args = {}) => {
  args.headers = mergeDeepRight(defaultHeaders, args.headers);

  log.debug(`Request: ${args.url}`);
  return method(args, fetch, handleSuccessfulRequest, handleFailingRequest);
};

const requests = {
  post: request(isomorphicRest.post),
  get: request(isomorphicRest.get)
};

export default requests;
