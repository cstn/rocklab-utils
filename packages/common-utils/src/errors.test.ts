import getErrorMessage from './errors';

describe('getErrorMessage', () => {
  it('should return message of a simple error', () => {
    const error = new Error('test');
    const message = getErrorMessage(error);

    expect(message).toEqual('test');
  });

  it('should return message of a detailed error', () => {
    const error = {
      data: {
        message: 'test',
      },
    };
    const message = getErrorMessage(error);

    expect(message).toEqual('test');
  });

  it('should fallback to string representation', () => {
    const error = 10;
    const message = getErrorMessage(error);

    expect(message).toEqual('10');
  });

  it('should fallback in case of an exception', () => {
    // construct a cyclic object to force an exception in JSON.stringify
    const data: { error: null | object } = { error: null };
    const error = { data };
    data.error = error;

    const message = getErrorMessage(error);

    expect(message).toContain('Converting circular structure to JSON');
  });
});
