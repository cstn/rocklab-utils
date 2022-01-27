import debounce from './debounce';

jest.useFakeTimers();

describe('debounce util', () => {
  const timeout = 1000;

  it('should debounce a function', () => {
    const calls = 10;
    const handler = jest.fn();
    const debouncedHandler = debounce(handler, timeout);

    debouncedHandler();
    expect(handler).toHaveBeenCalledTimes(0);

    for (let i = 0; i <= calls; i += 1) {
      jest.advanceTimersByTime(timeout / calls);
      debouncedHandler();
    }

    jest.advanceTimersByTime(timeout);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
