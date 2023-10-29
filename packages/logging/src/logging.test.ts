import createLogger from './logging';

describe('logging', () => {
  it('should create a logger', () => {
    const logger = createLogger();

    expect(logger).toBeDefined();
  });

  it('should log an info', () => {
    const logger = createLogger();
    const spy = jest.spyOn(logger, 'info');

    logger.info('Test');

    expect(spy).toHaveBeenCalledWith('Test');
  });

  it('should log an error', () => {
    const logger = createLogger();
    const spy = jest.spyOn(logger, 'error');

    logger.error('Test', { ex: 'exception' });

    expect(spy).toHaveBeenCalledWith('Test', { ex: 'exception' });
  });
});
