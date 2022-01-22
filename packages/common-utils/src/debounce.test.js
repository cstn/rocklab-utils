import debounce from './debounce';

describe('debounce util', () => {
  const timeout = 1000;
  const handler = jest.fn();
  const debouncedHandler = debounce(() => handler, timeout);

  it('should debounce a function', () => {
    debouncedHandler();
    debouncedHandler();
    debouncedHandler();

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
