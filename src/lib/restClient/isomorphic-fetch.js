const get = ({ url = '', headers = {} }, fetch) => {
  return fetch(url, {
    headers: {
      ...headers
    }
  });
};

const connectHandlers = method => (
  args,
  fetch,
  handleSuccessfulRequest,
  handleFailingRequest
) => {
  return method(args, fetch)
    .then(handleSuccessfulRequest)
    .catch(handleFailingRequest);
};

export default {
  get: connectHandlers(get)
};
