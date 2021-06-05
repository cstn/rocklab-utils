import debounce from './debounce';

describe('debounce util', () => {
  const timeout = 1000;
  const handler = jest.fn();
  const debouncedHandler = debounce(() => handler, timeout);

  xit('should debounce a function', async () => {
    debouncedHandler();
    debouncedHandler();
    debouncedHandler();

    await setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    }, timeout);
  });
});
