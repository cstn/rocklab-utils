import getDisplayName from './getDisplayName';

describe('getDisplayName', () => {
  it('should get a default', () => {
    const a = {};

    const result = getDisplayName(a);

    expect(result).toEqual('Component');
  });
});
