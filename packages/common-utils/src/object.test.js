import { clone, deepClone, map } from './object';

describe('object utils', () => {
  it('should clone an object', () => {
    const original = {
      a: 1,
      b: 2,
    };

    const cloned = clone(original);

    expect(cloned).toEqual(original);

    cloned.a = 3;

    expect(original.a).toEqual(1);
  });

  it('should deep clone an object', () => {
    const original = {
      a: 1,
      b: 2,
      c: {
        x: 1,
        y: 2,
      },
    };

    const cloned = deepClone(original);

    expect(cloned).toEqual(original);

    cloned.a = 3;
    cloned.c.x = 4;

    expect(original.a).toEqual(1);
    expect(original.c.x).toEqual(4);
  });

  it('should map object properties', () => {
    const original = {
      a: 1,
      b: 2,
    };

    const expected = {
      a: 2,
      b: 4,
    };

    const mapped = map(original, x => x * 2);

    expect(mapped).toEqual(expected);
  });
});
