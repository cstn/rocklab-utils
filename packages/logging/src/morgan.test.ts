import createLogger from './logging';
import morganMiddleware from './morgan';

describe('morgan middleware', () => {
  it('should create a middleware', () => {
    const logger = createLogger();
    const middlewareWare = morganMiddleware(logger);

    expect(middlewareWare).toBeDefined();
  });
});
