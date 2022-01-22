import debounce from './debounce';

jest.useFakeTimers();

describe('debounce util', () => {
  const timeout = 1000;

  xit('should debounce a function', () => {
    const handler = jest.fn();
    const debouncedHandler = debounce(() => handler, timeout);

    debouncedHandler();
    expect(handler).toHaveBeenCalledTimes(0);

    for (let i = 0; i < 11; i += 1) {
      jest.advanceTimersByTime(timeout / 10);
      debouncedHandler();
    }

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
